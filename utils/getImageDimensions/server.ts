import probe from 'probe-image-size'

export const getImageDimensions = async (url: string) => {
  try {
    const image = await probe(url)
    return {
      width: image.width,
      height: image.height,
    }
  } catch {
    return undefined
  }
}
