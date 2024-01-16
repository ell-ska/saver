import { Orientation } from '@prisma/client'

export const getImageOrientation = ({
  width,
  height,
}: {
  width: number
  height: number
}) => {
  return width < height ? Orientation.PORTRAIT : Orientation.LANDSCAPE
}
