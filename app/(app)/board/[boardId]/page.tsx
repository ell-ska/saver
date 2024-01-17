import { notFound } from 'next/navigation'

import { getBoard } from '@/actions/get-board'
import Details from '@/components/Details'
import Masonry from '@/components/Masonry'

type BoardPageProps = { params: { boardId: string } }

const BoardPage = async ({ params: { boardId } }: BoardPageProps) => {
  const { data: board, serverError } = await getBoard({
    boardId,
  })

  if (serverError === 'NOT_FOUND') return notFound()
  if (!board) return notFound()

  return (
    <>
      <Details
        id={boardId}
        title={board.title}
        description={board.description}
      />
      <Masonry content={board.cards.reverse()} className='mt-6 grow' />
    </>
  )
}

export default BoardPage
