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
import { getImageDimensions } from '@/utils/getImageDimensions/server'
import { isImage } from '@/utils/isImage/server'

export const generateCardData = async (
  values: z.infer<typeof createCardSchema>,
) => {
  if (values.type === CardType.LINK) {
    const { url } = values as z.infer<typeof createLinkCardSchema>
    const ogData = await getOgData(url)

    const image =
      ogData?.image && (await isImage(ogData.image.url))
        ? {
            url: ogData.image.url,
            width: ogData.image.width || 500,
            height: ogData.image.height || 375,
          }
        : undefined

    const faviconUrl =
      ogData?.faviconUrl &&
      ((await isImage(ogData.faviconUrl)) ? ogData.faviconUrl : undefined)

    return {
      link: {
        create: {
          url,
          title: ogData?.title,
          description: ogData?.description,
          faviconUrl,
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
      const dimensions = await getImageDimensions(image)
      if (!dimensions) throw Error('malformed image')
      const orientation = getImageOrientation(dimensions)

      return {
        image: {
          create: {
            url: image,
            width: dimensions.width,
            height: dimensions.height,
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
    if (!uploadResponse) throw Error('image upload failed')

    const dimensions = await getImageDimensions(uploadResponse.url)
    if (!dimensions) throw Error('malformed image')
    const orientation = getImageOrientation(dimensions)

    return {
      image: {
        create: {
          url: uploadResponse.url,
          width: dimensions.width,
          height: dimensions.height,
          orientation,
        },
      },
    }
  }

  return undefined
}
