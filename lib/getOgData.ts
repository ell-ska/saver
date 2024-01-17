import ogs from 'open-graph-scraper'
import probe from 'probe-image-size'

export const getOgData = async (url: string) => {
  try {
    const { error, result } = await ogs({ url })

    if (error || !result.success) {
      return undefined
    }

    const ogImage = result.ogImage?.[0]
    const imageSize = ogImage && (await probe(ogImage.url))

    return {
      title: result.ogTitle,
      description: result.ogDescription,
      faviconUrl: result.favicon?.startsWith('/')
        ? result.ogUrl + result.favicon
        : result.favicon,
      image: ogImage && {
        url: ogImage.url,
        width: imageSize?.width,
        height: imageSize?.height,
      },
    }
  } catch {
    return undefined
  }
}
