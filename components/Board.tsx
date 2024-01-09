import { slugify } from '@/utils/slugify'
import Card from '@/components/Card'

type BoardProps = {
  id: string
  title: string
  itemCount: string
  previewCards: any[] // TODO: change to card type when implemented, array of three cards
}

const Board = ({ id, title, itemCount, previewCards }: BoardProps) => {
  return (
    <Card
      width='full'
      href={`/board/${slugify(title)}-${id}`}
      className='space-y-2 p-4 pb-6'
    >
      <div>
        <h3 className='text-2xl font-bold'>{title}</h3>
        <span className='text-sm'>{itemCount} items</span>
        {/* TODO: add shared profiles */}
      </div>
      <div className='flex gap-2'>
        {previewCards.map((card) => (
          // TODO: map over actual cards
          <Card
            key={card}
            className='aspect-square w-full flex-1 bg-primary'
          ></Card>
        ))}
      </div>
    </Card>
  )
}

export default Board
