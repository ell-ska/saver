import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { memberQuery } from '@/lib/access-control-queries'
import { handleServerError } from '@/app/api/utils'

export const GET = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    const card = await memberQuery({ cardId: id }, () =>
      db.card.findUnique({
        where: { id },
        select: {
          parentBoard: { select: { id: true, title: true } },
          id: true,
          image: { select: { url: true } },
          link: { select: { title: true, url: true } },
        },
      }),
    )

    if (!card) {
      return new NextResponse(null, {
        status: 404,
        statusText: 'card not found',
      })
    }

    const response: CardTitleResponse = [
      {
        title: card.parentBoard.title,
        id: card.parentBoard.id,
        type: 'board',
      },
      {
        title: card.image?.url || card.link?.title || card.link?.url,
        id: card.id,
        type: 'card',
      },
    ]

    return NextResponse.json(response)
  } catch (error) {
    handleServerError(error, '[CARD_TITLE_API_ERROR]')
  }
}

export type CardTitleResponse = {
  title: string | undefined
  id: string
  type: 'board' | 'card'
}[]
