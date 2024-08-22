import { notFound } from 'next/navigation'

import { getBoard } from '@/actions/get-board'
import { Details } from '@/components/Details'
import { Masonry } from '@/components/Masonry'

export default async function BoardPage({
  params: { boardId },
}: {
  params: { boardId: string }
}) {
  const result = await getBoard({
    boardId,
  })

  if (!result?.data) return notFound()
  const board = result.data

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
