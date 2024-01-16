import { ImageProps } from 'next/image'

import Image from '@/components/ui/Image'
import CardWrapper from './CardWrapper'

type ImageCardProps = ImageProps

const ImageCard = ({ src, alt, width, height, className }: ImageCardProps) => {
  return (
    <CardWrapper>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </CardWrapper>
  )
}

export default ImageCard
