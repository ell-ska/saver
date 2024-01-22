import { notFound } from 'next/navigation'

import { getCard } from '@/actions/get-card'

type CardPageProps = {
  params: { cardId: string }
}

const CardPage = async ({ params: { cardId } }: CardPageProps) => {
  const { data: card } = await getCard({ cardId })

  if (!card) return notFound()

  return <div>{card.id}</div>
}

export default CardPage
