import 'server-only'

import sharp from 'sharp'
import { rgbaToThumbHash } from 'thumbhash'

export const getBase64Blurhash = async (buffer: ArrayBuffer) => {
  const blurhashBuffer = await sharp(buffer)
    .resize(100, 100, {
      fit: 'inside',
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const binaryBlurhash = rgbaToThumbHash(
    blurhashBuffer.info.width,
    blurhashBuffer.info.height,
    blurhashBuffer.data,
  )

  return Buffer.from(binaryBlurhash).toString('base64')
}
