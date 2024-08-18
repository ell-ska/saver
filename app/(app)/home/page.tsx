import { getBoards } from '@/actions/get-boards'
import { HomeEmpty } from './HomeEmpty'
import { BoardSection } from '@/components/BoardSection'

export default async function HomePage() {
  const { data } = await getBoards([
    {
      title: 'favorites',
      limit: 3,
    },
    {
      title: 'where you left off',
      limit: 3,
    },
  ])

  if (!data?.['favorites'].length && !data?.['where you left off'].length)
    return <HomeEmpty />

  return (
    <div className='space-y-8'>
      {Object.keys(data).map((title) => {
        if (data[title].length === 0) return
        return <BoardSection key={title} title={title} boards={data[title]} />
      })}
    </div>
  )
}
