import probe from 'probe-image-size'

export const isImage = async (url: string) => {
  try {
    await probe(url)
    return true
  } catch {
    return false
  }
}
