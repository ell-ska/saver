import { getBoards } from '@/actions/get-boards'
import { HomeEmpty } from './HomeEmpty'
import { BoardSection } from '@/components/BoardSection'

export default async function HomePage() {
  const result = await getBoards([
    {
      title: 'favorites',
      limit: 3,
    },
    {
      title: 'where you left off',
      limit: 3,
    },
  ])

  if (
    result?.data === undefined ||
    (result.data['favorites'].length === 0 &&
      result.data['where you left off'].length === 0)
  ) {
    return <HomeEmpty />
  }

  const boardsWithKeys = result.data

  return (
    <div className='space-y-8'>
      {Object.keys(boardsWithKeys).map((title) => {
        if (boardsWithKeys[title].length === 0) return null

        return (
          <BoardSection
            key={title}
            title={title}
            boards={boardsWithKeys[title]}
          />
        )
      })}
    </div>
  )
}
