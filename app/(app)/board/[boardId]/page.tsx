import { notFound } from 'next/navigation'

import { db } from '@/lib/data/db'
import { memberQuery } from '@/lib/data/access-control-queries'
import { Details } from '@/components/Details'
import { Masonry } from '@/components/Masonry'

export default async function BoardPage({
  params: { boardId },
}: {
  params: { boardId: string }
}) {
  const board = await memberQuery({ boardId }, () =>
    db.board.findUnique({
      where: { id: boardId },
      include: {
        cards: {
          include: { image: true, link: { include: { image: true } } },
          orderBy: { updatedAt: 'asc' },
        },
      },
    }),
  )

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
