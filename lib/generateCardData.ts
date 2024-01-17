import sharp from 'sharp'
import { z } from 'zod'
import { CardType } from '@prisma/client'

import {
  createCardSchema,
  createLinkCardSchema,
  createImageCardSchema,
} from '@/lib/schemas'
import { backendClient } from '@/lib/edgestore'
import { getImageOrientation } from '@/lib/getImageOrientation'
import { getOgData } from '@/lib/getOgData'
import { getImageDimensions } from '@/utils/getServerImageDimensions'

export const generateCardData = async (
  values: z.infer<typeof createCardSchema>,
) => {
  if (values.type === CardType.LINK) {
    const { url } = values as z.infer<typeof createLinkCardSchema>
    const ogData = await getOgData(url)

    const image = ogData?.image && {
      url: ogData.image.url,
      width: ogData.image.width || 500,
      height: ogData.image.height || 375,
    }

    return {
      link: {
        create: {
          url,
          title: ogData?.title,
          description: ogData?.description,
          faviconUrl: ogData?.faviconUrl,
          image: image && {
            create: {
              ...image,
            },
          },
        },
      },
    }
  }

  if (values.type === CardType.IMAGE) {
    const { image } = values as z.infer<typeof createImageCardSchema>
    if (!image) return undefined

    if (typeof image === 'string') {
      const { width, height } = await getImageDimensions(image)
      const orientation = getImageOrientation({ width, height })

      return {
        image: {
          create: {
            url: image,
            width,
            height,
            orientation,
          },
        },
      }
    }

    const file = image.get('image') as File | null
    if (!file || !file.type.startsWith('image/')) return undefined

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

    const { width, height } = await getImageDimensions(uploadResponse.url)
    const orientation = getImageOrientation({ width, height })

    return {
      image: {
        create: {
          url: uploadResponse.url,
          width,
          height,
          orientation,
        },
      },
    }
  }

  return undefined
}
