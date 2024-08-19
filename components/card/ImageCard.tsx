import { ImageProps } from 'next/image'

import type { CardSize } from '@/lib/types'
import { cn } from '@/utils/classnames'
import { CardWrapper } from './CardWrapper'
import { SelectedOverlay } from './SelectedOverlay'
import { Image } from '@/components/ui/Image'

export const ImageCard = ({
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
}: ImageProps & {
  onClick?: () => void
  asLink?: boolean
  href?: string
  size?: CardSize
  selected?: boolean
}) => {
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
