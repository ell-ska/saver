'use client'

export const isImage = (url: string) => {
  let image = new Image()
  image.src = url

  const result: Promise<boolean> = new Promise((resolve) => {
    image.onerror = () => {
      resolve(false)
    }
    image.onload = () => {
      resolve(true)
    }
  })

  return result
}
