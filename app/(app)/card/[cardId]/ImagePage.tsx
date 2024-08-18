import { Image } from '@prisma/client'

import ImageCard from '@/components/card/ImageCard'

export const ImagePage = ({
  url,
  width,
  height,
  caption,
}: Image & { caption: string | null }) => {
  return (
    <div className='flex max-h-[calc(100vh-7rem)] grow flex-col self-center md:justify-center'>
      <ImageCard
        src={url}
        alt=''
        width={width}
        height={height}
        className='max-w-xl'
      />
      {caption && <p className='mt-4 text-sm'>{caption}</p>}
    </div>
  )
}
