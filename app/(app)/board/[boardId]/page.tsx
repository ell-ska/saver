import { notFound } from 'next/navigation'

import { getBoard } from '@/actions/get-board'
import { Details } from '@/components/Details'
import { Masonry } from '@/components/Masonry'

export default async function BoardPage({
  params: { boardId },
}: {
  params: { boardId: string }
}) {
  const { data: board } = await getBoard({
    boardId,
  })

  if (!board) return notFound()

  return (
    <>
      <Details
        id={boardId}
        title={board.title}
        description={board.description}
      />
      <Masonry cards={board.cards.reverse()} className='mt-6 grow' />
    </>
  )
}
