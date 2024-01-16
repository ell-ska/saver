'use client'

export const getImageDimensions = (url: string) => {
  let image = new Image()

  image.src = url
  const dimensions: Promise<{ width: number; height: number }> = new Promise(
    (resolve) => {
      image.onload = () => {
        const width = image.width
        const height = image.height
        resolve({ width, height })
      }
    },
  )

  return dimensions
}
