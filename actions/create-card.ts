'use server'

import { revalidatePath } from 'next/cache'
import sharp from 'sharp'
import { z } from 'zod'
import { CardType } from '@prisma/client'

import { memberActionClient } from './utils/safe-action'
import { db } from '@/lib/data/db'
import { backendClient } from '@/lib/data/edgestore'
import { getOgData } from '@/lib/data/getOgData'
import { createCardSchema } from '@/lib/schemas'
import { getImageOrientation } from '@/lib/getImageOrientation'
import { getBase64Blurhash } from '@/utils/blurhash'
import { getImageDimensions } from '@/utils/getImageDimensions/server'
import { isImage } from '@/utils/isImage/server'

export const createCard = memberActionClient
  .schema(createCardSchema)
  .action(async ({ parsedInput }) => {
    try {
      const cardData = await generateCardData(parsedInput)
      const { parentBoardId, type, caption } = parsedInput

      const card = await db.card.create({
        data: { parentBoardId, type, caption, ...cardData },
      })

      revalidatePath(`/board/${parentBoardId}`)
      return card
    } catch (error) {
      console.log('CREATE_CARD_ACTION_ERROR', error)
      throw Error('something went wrong')
    }
  })

const generateCardData = async (values: z.infer<typeof createCardSchema>) => {
  switch (values.type) {
    case CardType.LINK:
      return await generateLinkData(values.url)
    case CardType.IMAGE:
      return await generateImageData(values.image)
  }
}

const generateLinkData = async (url: string) => {
  const ogData = await getOgData(url)
  if (!ogData) {
    return {
      link: {
        create: {
          url,
        },
      },
    }
  }

  const faviconUrl =
    ogData.faviconUrl &&
    ((await isImage(ogData.faviconUrl)) ? ogData.faviconUrl : undefined)

  if (!ogData.image || !(await isImage(ogData.image.url))) {
    return {
      link: {
        create: {
          url,
          title: ogData.title,
          description: ogData.description,
          faviconUrl,
        },
      },
    }
  }

  const blurhashResponse = await fetch(ogData.image.url)
  const blurhashBuffer = await blurhashResponse.arrayBuffer()

  return {
    link: {
      create: {
        url,
        title: ogData.title,
        description: ogData.description,
        faviconUrl,
        image: {
          create: {
            url: ogData.image.url,
            width: ogData.image.width || 500,
            height: ogData.image.height || 375,
            blurhash: await getBase64Blurhash(blurhashBuffer),
          },
        },
      },
    },
  }
}

const generateImageData = async (image: string | FormData) => {
  if (typeof image === 'string') {
    const dimensions = await getImageDimensions(image)
    if (!dimensions) throw Error('malformed image')

    const blurhashResponse = await fetch(image)
    const blurhashBuffer = await blurhashResponse.arrayBuffer()

    return {
      image: {
        create: {
          url: image,
          width: dimensions.width,
          height: dimensions.height,
          orientation: getImageOrientation(dimensions),
          blurhash: await getBase64Blurhash(blurhashBuffer),
        },
      },
    }
  }

  const file = image.get('image') as File | null
  if (!file || !file.type.startsWith('image/')) throw Error('malformed file')

  const buffer = await file.arrayBuffer()
  const resizedFile = await sharp(buffer)
    .resize(1500, 1500, {
      withoutEnlargement: true,
      fit: 'inside',
    })
    .jpeg({ quality: 80 })
    .toBuffer()

  const blob = new Blob(new Array(resizedFile), { type: 'image/*' })
  const extension = file.type.split('/')[1]

  const uploadResponse = await backendClient.publicFiles.upload({
    content: {
      blob,
      extension,
    },
  })
  if (!uploadResponse) throw Error('image upload failed')

  const dimensions = await getImageDimensions(uploadResponse.url)
  if (!dimensions) throw Error('malformed image')

  return {
    image: {
      create: {
        url: uploadResponse.url,
        width: dimensions.width,
        height: dimensions.height,
        orientation: getImageOrientation(dimensions),
        blurhash: await getBase64Blurhash(buffer),
      },
    },
  }
}
