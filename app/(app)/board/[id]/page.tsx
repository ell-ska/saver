import Details from '@/components/Details'

type BoardPageProps = { params: { id: string } }

const BoardPage = ({ params: { id } }: BoardPageProps) => {
  return (
    <div>
      {/* temporary */}
      <Details id={id} title='test' description='hejsan hejsan' />
    </div>
  )
}

export default BoardPage
