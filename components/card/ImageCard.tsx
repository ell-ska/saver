import { ImageProps } from 'next/image'

import { CardSize } from '@/lib/types'
import { cn } from '@/utils/classnames'
import Image from '@/components/ui/Image'
import CardWrapper from './CardWrapper'
import SelectedOverlay from './SelectedOverlay'

type ImageCardProps = ImageProps & {
  onClick?: () => void
  asLink?: boolean
  href?: string
  size?: CardSize
  selected?: boolean
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
  selected,
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
      {selected && <SelectedOverlay />}
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
