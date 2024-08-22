import { notFound } from 'next/navigation'
import { CardType } from '@prisma/client'

import { getCard } from '@/actions/get-card'
import { ImagePage } from './ImagePage'
import { LinkPage } from './LinkPage'

export default async function CardPage({
  params: { cardId },
}: {
  params: { cardId: string }
}) {
  const result = await getCard({ cardId })

  if (!result?.data) return notFound()
  const card = result.data

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
