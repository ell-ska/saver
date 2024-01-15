import { z } from 'zod'
import { CardType } from '@prisma/client'

import {
  createCardSchema,
  createLinkCardSchema,
  createImageCardSchema,
} from '@/lib/schemas'
import { getOgData } from '@/utils/getOgData'

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
    return undefined
  }

  return undefined
}
