import { notFound } from 'next/navigation'
import { CardType } from '@prisma/client'

import { getCard } from '@/actions/get-card'
import ImagePage from './ImagePage'

type CardPageProps = {
  params: { cardId: string }
}

const CardPage = async ({ params: { cardId } }: CardPageProps) => {
  const { data: card } = await getCard({ cardId })

  if (!card) return notFound()

  const pageMap: { [key in CardType]: React.ReactNode } = {
    [CardType.IMAGE]: card.image ? <ImagePage {...card.image} /> : undefined,
    [CardType.LINK]: card.link && <div>link</div>,
  }

  return (
    <div className='flex max-h-[calc(100vh-7rem)] grow flex-col self-center md:justify-center'>
      {pageMap[card.type]}
      {card.caption && <p className='mt-4 text-sm'>{card.caption}</p>}
    </div>
  )
}

export default CardPage
