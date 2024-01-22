import { ImageProps } from 'next/image'

import { CardSize } from '@/lib/types'
import { cn } from '@/utils/classnames'
import Image from '@/components/ui/Image'
import CardWrapper from './CardWrapper'

type ImageCardProps = ImageProps & { href?: string; size?: CardSize }

const ImageCard = ({
  src,
  alt,
  width,
  height,
  href,
  size,
  className,
}: ImageCardProps) => {
  return (
    <CardWrapper
      href={href}
      rounded={size === 'preview' ? 'sm' : 'lg'}
      className={cn(size === 'preview' && 'aspect-square', className)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className='h-full'
      />
    </CardWrapper>
  )
}

export default ImageCard
