import Details from '@/components/Details'

type BoardPageProps = { params: { boardId: string } }

const BoardPage = ({ params: { boardId } }: BoardPageProps) => {
  return (
    <div>
      {/* temporary */}
      <Details id={boardId} title='test' description='hejsan hejsan' />
    </div>
  )
}

export default BoardPage
