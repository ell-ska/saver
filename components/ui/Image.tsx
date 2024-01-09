import NextImage, { ImageProps as NextImageProps } from 'next/image'

import { cn } from '@/utils/classnames'

type ImageProps = NextImageProps & {
  aspect?: 'original' | '1:1' | '3:4' | '9:16'
  orientation?: 'landscape' | 'portrait'
}

const Image = ({
  aspect = 'original',
  orientation = 'landscape',
  className,
  ...props
}: ImageProps) => {
  const getDimension = () => {
    switch (aspect) {
      case 'original':
        return 'aspect-auto'
      case '1:1':
        return 'aspect-square'
      case '3:4':
        return orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]'
      case '9:16':
        return orientation === 'landscape' ? 'aspect-[16/9]' : 'aspect-[9/16]'
    }
  }

  return (
    <NextImage
      className={cn('object-cover', getDimension(), className)}
      {...props}
    />
  )
}

export default Image
