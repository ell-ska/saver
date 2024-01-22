import { notFound } from 'next/navigation'
import { CardType } from '@prisma/client'

import { getCard } from '@/actions/get-card'
import ImagePage from './ImagePage'
import LinkPage from './LinkPage'

type CardPageProps = {
  params: { cardId: string }
}

const CardPage = async ({ params: { cardId } }: CardPageProps) => {
  const { data: card } = await getCard({ cardId })

  if (!card) return notFound()

  const pageMap: { [key in CardType]: React.ReactNode } = {
    [CardType.IMAGE]: card.image && (
      <ImagePage {...card.image} caption={card.caption} />
    ),
    [CardType.LINK]: card.link && (
      <LinkPage {...card.link} caption={card.caption} />
    ),
  }

  return <>{pageMap[card.type]}</>
}

export default CardPage
