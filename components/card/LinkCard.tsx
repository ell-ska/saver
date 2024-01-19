import { Link, Image as TImage } from '@prisma/client'

import { CardSize } from '@/lib/types'
import { cn } from '@/utils/classnames'
import { prettifyUrl } from '@/utils/prettyUrl'
import Image from '@/components/ui/Image'
import CardWrapper from './CardWrapper'

type LinkCardProps = Link & {
  image: TImage | null
  size?: CardSize
  className?: string
}

const LinkCard = ({
  title,
  description,
  faviconUrl,
  url,
  image,
  size,
  className,
}: LinkCardProps) => {
  return (
    <CardWrapper
      rounded={size === 'preview' ? 'sm' : 'lg'}
      className={cn(
        'flex flex-col',
        size === 'preview' && 'aspect-square',
        className,
      )}
    >
      {image && (
        <Image
          src={image.url}
          alt=''
          width={image.width}
          height={image.height}
          className='grow'
        />
      )}
      <div
        className={cn(
          'flex flex-col gap-2 px-4 py-2',
          size === 'preview' && 'gap-1 px-2 py-1',
        )}
      >
        {size !== 'preview' && (title || description) && (
          <div className='space-y-1'>
            {title && <h5 className='font-semibold'>{title}</h5>}
            {description && <p className='text-sm'>{description}</p>}
          </div>
        )}
        <div
          className={cn(
            'flex items-center gap-2',
            size === 'preview' && 'gap-1',
          )}
        >
          {faviconUrl && (
            <Image
              src={faviconUrl}
              alt='favicon'
              width={16}
              height={16}
              className={cn(
                'size-4 shrink-0 object-contain',
                size === 'preview' && 'size-3',
              )}
            />
          )}
          <span
            className={cn(
              'truncate text-sm',
              !title && size !== 'preview' && 'text-base font-semibold',
            )}
          >
            {size === 'preview' && title ? title : prettifyUrl(url)}
          </span>
        </div>
      </div>
    </CardWrapper>
  )
}

export default LinkCard
