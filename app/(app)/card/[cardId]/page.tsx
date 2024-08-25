import { notFound } from 'next/navigation'
import { CardType } from '@prisma/client'
import type { ReactNode } from 'react'

import { db } from '@/lib/db'
import { memberQuery } from '@/lib/access-control-queries'
import { ImagePage } from './ImagePage'
import { LinkPage } from './LinkPage'

export default async function CardPage({
  params: { cardId },
}: {
  params: { cardId: string }
}) {
  const card = await memberQuery({ cardId }, () =>
    db.card.findUnique({
      where: { id: cardId },
      include: { image: true, link: { include: { image: true } } },
    }),
  )

  if (!card) return notFound()

  const pageMap: { [key in CardType]: ReactNode } = {
    [CardType.IMAGE]: card.image && (
      <ImagePage {...card.image} caption={card.caption} />
    ),
    [CardType.LINK]: card.link && (
      <LinkPage {...card.link} caption={card.caption} />
    ),
  }

  return <>{pageMap[card.type]}</>
}
