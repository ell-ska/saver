import { CardWithNested } from '@/lib/types'
import { cn } from '@/utils/classnames'
import CardWrapper from '@/components/card/CardWrapper'
import CardMap from '@/components/card/CardMap'

type BoardProps = {
  id: string
  title: string
  itemCount: number
  previewCards: CardWithNested[]
}

const Board = ({ id, title, itemCount, previewCards }: BoardProps) => {
  const placeholders = Array.from(
    { length: Math.max(0, 3 - previewCards.length) },
    (_, i) => i + 1,
  )

  return (
    <CardWrapper
      href={`/board/${id}`}
      className='cursor-pointer space-y-2 p-4 pb-6'
    >
      <div>
        <h3 className='truncate text-2xl font-bold'>{title}</h3>
        <span className={cn('text-sm', !itemCount && 'text-slate-400')}>
          {itemCount} items
        </span>
        {/* TODO: add shared profiles */}
      </div>
      <div className='flex gap-2'>
        {previewCards.slice(0, 3).map((card) => (
          <CardMap key={card.id} {...card} size='preview' className='flex-1' />
        ))}
        {placeholders.map((placeholder) => (
          <CardWrapper
            key={placeholder}
            rounded='sm'
            className='aspect-square flex-1'
          />
        ))}
      </div>
    </CardWrapper>
  )
}

export default Board
