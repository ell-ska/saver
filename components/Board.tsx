import CardWrapper from '@/components/card/CardWrapper'

type BoardProps = {
  id: string
  title: string
  itemCount: string
  previewCards: any[] // TODO-t60: change to card type when implemented, array of three cards
}

const Board = ({ id, title, itemCount, previewCards }: BoardProps) => {
  return (
    <CardWrapper
      width='full'
      href={`/board/${id}`}
      className='space-y-2 p-4 pb-6'
    >
      <div>
        <h3 className='text-2xl font-bold'>{title}</h3>
        <span className='text-sm'>{itemCount} items</span>
        {/* TODO: add shared profiles */}
      </div>
      <div className='flex gap-2'>
        {previewCards.map((card) => (
          // TODO-t60: map over actual cards
          <CardWrapper
            key={card}
            className='aspect-square w-full flex-1 bg-primary'
          ></CardWrapper>
        ))}
      </div>
    </CardWrapper>
  )
}

export default Board
