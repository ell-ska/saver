import { Board } from '@/components/Board'
import type { BoardWithCards } from '@/lib/types'

export const BoardSection = ({
  title,
  boards,
}: {
  title: string
  boards: (Pick<BoardWithCards, 'id' | 'title' | 'cards'> & {
    _count: { [key: string]: number }
  })[]
}) => {
  return (
    <section>
      <h3 className='mb-4 text-xl font-bold md:mb-6'>{title}</h3>
      <div className='grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {boards.map(({ id, title, cards, _count }) => (
          <Board
            key={id}
            id={id}
            title={title}
            previewCards={cards}
            itemCount={_count.cards}
          />
        ))}
      </div>
    </section>
  )
}
