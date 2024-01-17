import { Link, Image as TImage } from '@prisma/client'

import { cn } from '@/utils/classnames'
import { prettifyUrl } from '@/utils/prettyUrl'
import Image from '@/components/ui/Image'
import CardWrapper from './CardWrapper'

type LinkCardProps = Link & { image: TImage | null }

const LinkCard = ({
  title,
  description,
  faviconUrl,
  url,
  image,
}: LinkCardProps) => {
  return (
    <CardWrapper className='flex flex-col'>
      {image && (
        <Image
          src={image.url}
          alt=''
          width={image.width}
          height={image.height}
        />
      )}
      <div className='flex flex-col gap-2 px-4 py-2'>
        {(title || description) && (
          <div className='space-y-1'>
            {title && <h5 className='font-semibold'>{title}</h5>}
            {description && <p className='text-sm'>{description}</p>}
          </div>
        )}
        <div className='flex items-center gap-2'>
          {faviconUrl && (
            <Image
              src={faviconUrl}
              alt='favicon'
              width={16}
              height={16}
              className='size-4 object-contain'
            />
          )}
          <span
            className={cn('text-sm', !title && 'text-balance font-semibold')}
          >
            {prettifyUrl(url)}
          </span>
        </div>
      </div>
    </CardWrapper>
  )
}

export default LinkCard
