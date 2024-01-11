import Link from 'next/link'

import Card from '@/components/Card'

type PreviewProps = {
  type: 'card' | 'board'
  id: string
  title: string
  parentTitle?: string
  previewCard: any // TODO: change to card type when implemented
}

const Preview = ({
  type,
  id,
  title,
  parentTitle,
  previewCard,
}: PreviewProps) => {
  return (
    <Link
      href={`/${type}/${title}-${id}`}
      className='flex w-full items-center justify-between gap-8'
    >
      <div className='flex min-w-0 items-center gap-4'>
        {/* TODO: add actual card */}
        <Card rounded='sm' className='size-4 shrink-0 bg-primary'></Card>
        <h4 className='truncate'>{title}</h4>
      </div>
      {parentTitle && (
        <span className='whitespace-nowrap text-sm text-slate-400'>
          {parentTitle}
        </span>
      )}
      {/* TODO: add shared profiles */}
    </Link>
  )
}

export default Preview