import { db } from '@/lib/data/db'
import { authenticatedQuery } from '@/lib/data/access-control-queries'
import { HomeEmpty } from './HomeEmpty'
import { BoardSection } from '@/components/BoardSection'

export default async function HomePage() {
  const favoriteBoards = await authenticatedQuery((userId) =>
    db.board.findMany({
      where: {
        isFavorite: true,
        members: {
          some: {
            userId,
          },
        },
      },
      take,
      select,
    }),
  )

  const latestUpdatedBoards = await authenticatedQuery((userId) =>
    db.board.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
      take,
      select,
    }),
  )

  if (
    !favoriteBoards ||
    !latestUpdatedBoards ||
    (favoriteBoards.length === 0 && latestUpdatedBoards.length === 0)
  ) {
    return <HomeEmpty />
  }

  return (
    <div className='space-y-8'>
      {favoriteBoards.length > 0 && (
        <BoardSection title='favorites' boards={favoriteBoards} />
      )}
      {latestUpdatedBoards.length > 0 && (
        <BoardSection title='where you left off' boards={latestUpdatedBoards} />
      )}
    </div>
  )
}

const take = 3

const select = {
  id: true,
  title: true,
  cards: {
    orderBy: { createdAt: 'desc' },
    include: { image: true, link: { include: { image: true } } },
    take: 3,
  },
  _count: true,
} as const
