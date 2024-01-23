import { ImageProps } from 'next/image'

import { CardSize } from '@/lib/types'
import { cn } from '@/utils/classnames'
import Image from '@/components/ui/Image'
import CardWrapper from './CardWrapper'

type ImageCardProps = ImageProps & {
  onClick?: () => void
  asLink?: boolean
  href?: string
  size?: CardSize
}

const ImageCard = ({
  src,
  alt,
  width,
  height,
  onClick,
  asLink,
  href,
  size,
  className,
}: ImageCardProps) => {
  return (
    <CardWrapper
      onClick={onClick}
      asLink={asLink}
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
