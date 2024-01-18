import { HomePageBoard } from '@/lib/types'
import Board from '@/components/Board'

type BoardSectionProps = {
  title: string
  boards: HomePageBoard[]
}

const BoardSection = ({ title, boards }: BoardSectionProps) => {
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

export default BoardSection
