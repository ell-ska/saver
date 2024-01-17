import { notFound } from 'next/navigation'

import { getBoard } from '@/actions/get-board'
import Details from '@/components/Details'
import Masonry from '@/components/Masonry'

type BoardPageProps = { params: { boardId: string } }

const BoardPage = async ({ params: { boardId } }: BoardPageProps) => {
  const { data, serverError } = await getBoard({
    boardId,
  })

  if (serverError === 'NOT_FOUND') return notFound()
  if (!data) return notFound()

  return (
    <>
      <Details id={boardId} title={data.title} description={data.description} />
      <Masonry>hej</Masonry>
    </>
  )
}

export default BoardPage
