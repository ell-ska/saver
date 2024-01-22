import { Image } from '@prisma/client'

import ImageCard from '@/components/card/ImageCard'

type ImagePageProps = Image

const ImagePage = ({ url, width, height }: ImagePageProps) => {
  return (
    <ImageCard
      src={url}
      alt=''
      width={width}
      height={height}
      className='max-w-xl'
    />
  )
}

export default ImagePage
