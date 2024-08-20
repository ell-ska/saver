'use client'

import { useState } from 'react'
import { thumbHashToDataURL } from 'thumbhash'
import NextImage, { type ImageProps } from 'next/image'

import { cn } from '@/utils/classnames'

export const Image = ({
  blurhash,
  aspectRatio = 'original',
  orientation = 'landscape',
  className,
  ...props
}: ImageProps & {
  blurhash?: string | null
  aspectRatio?: 'original' | '1:1' | '3:4' | '9:16'
  orientation?: 'landscape' | 'portrait'
}) => {
  const [error, setError] = useState(false)

  const getDimension = () => {
    switch (aspectRatio) {
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
      className={cn(
        'min-h-0 min-w-0 object-cover',
        getDimension(),
        className,
        error && 'hidden',
      )}
      onError={() => setError(true)}
      blurDataURL={
        blurhash
          ? thumbHashToDataURL(Buffer.from(blurhash, 'base64'))
          : undefined
      }
      placeholder={blurhash ? 'blur' : 'empty'}
      {...props}
    />
  )
}
