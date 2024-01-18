import { CardWithNested } from '@/lib/types'
import Button from '@/components/ui/Button'
import CardMap from '@/components/card/CardMap'
import CardWrapper from '@/components/card/CardWrapper'

type PreviewProps = {
  type: 'card' | 'board'
  id: string
  title?: string
  parentTitle?: string
  previewCard?: CardWithNested
}

const Preview = ({
  type,
  id,
  title,
  parentTitle,
  previewCard,
}: PreviewProps) => {
  return (
    <Button
      asLink
      href={`/${type}/${id}`}
      variant='ghost'
      className='flex items-center justify-between gap-8 rounded-none px-4 py-1'
    >
      <div className='flex min-w-0 items-center gap-4'>
        {/* TODO: add preview image */}
        {/* {previewCard ? (
          <CardMap
            {...previewCard}
            size='preview'
            className='size-6 shrink-0'
          />
        ) : (
          <CardWrapper rounded='sm' className='size-6 shrink-0' />
        )} */}
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

export default Preview
