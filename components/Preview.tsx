import { CardWithNested } from '@/lib/types'
import { cn } from '@/utils/classnames'
import { ImageCard } from './card/ImageCard'
import { Button } from '@/components/ui/Button'
import { CardWrapper } from '@/components/card/CardWrapper'

export const Preview = ({
  title,
  parentTitle,
  previewCard,
  onClick,
  asLink,
  href,
  className,
}: {
  title: string
  parentTitle?: string
  previewCard?: CardWithNested
  className?: string
  onClick?: () => void
  asLink?: boolean
  href?: string
}) => {
  const previewImage =
    previewCard?.type === 'LINK'
      ? previewCard.link?.image
      : previewCard?.type === 'IMAGE'
        ? previewCard?.image
        : undefined

  return (
    <Button
      onClick={onClick}
      asLink={asLink}
      href={href}
      variant='ghost'
      className={cn(
        'flex w-full items-center justify-between gap-8 rounded-none px-4 py-1',
        className,
      )}
    >
      <div className='flex min-w-0 items-center gap-4'>
        {previewImage ? (
          <ImageCard
            src={previewImage.url}
            alt=''
            width={previewImage.width}
            height={previewImage.height}
            size='preview'
            className='size-6 shrink-0'
          />
        ) : (
          <CardWrapper rounded='sm' className='size-6 shrink-0' />
        )}
        <h4 className='truncate'>{title}</h4>
      </div>
      {parentTitle && (
        <span className='whitespace-nowrap text-sm text-slate-400'>
          {parentTitle}
        </span>
      )}
      {/* TODO: add shared profiles */}
    </Button>
  )
}
