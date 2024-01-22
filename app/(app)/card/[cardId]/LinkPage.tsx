import Link from 'next/link'
import { Image as TImage, Link as TLink } from '@prisma/client'

import { cn } from '@/utils/classnames'
import { prettifyUrl } from '@/utils/prettyUrl'
import Image from '@/components/ui/Image'
import ImageCard from '@/components/card/ImageCard'

type LinkPageProps = TLink & { image: TImage | null; caption: string | null }

const LinkPage = ({
  url,
  title,
  description,
  faviconUrl,
  image,
  caption,
}: LinkPageProps) => {
  return (
    <div className='flex grow flex-col gap-6 self-center md:max-h-[calc(100vh-7rem)] md:flex-row md:items-center md:gap-8'>
      <div className='md:flex-1'>
        {title && <h2 className='text-2xl font-bold'>{title}</h2>}
        {description && <p className='mt-1 text-sm md:mt-2'>{description}</p>}
        <Link
          href={url}
          className={cn(
            'mt-2 flex items-center gap-2 text-sm transition hover:text-primary-dark md:mt-4',
            !title && 'text-2xl font-bold',
          )}
        >
          {faviconUrl && (
            <Image
              src={faviconUrl}
              alt='favicon'
              width={16}
              height={16}
              className='size-4 shrink-0 object-contain'
            />
          )}
          {prettifyUrl(url)}
        </Link>
        {caption && <p className='mt-8 hidden text-sm md:block'>{caption}</p>}
      </div>
      {image && (
        <ImageCard
          src={image.url}
          alt=''
          width={image.width}
          height={image.height}
          className='md:flex-1'
        />
      )}
      {caption && <p className='text-sm md:hidden'>{caption}</p>}
    </div>
  )
}

export default LinkPage
