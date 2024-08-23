import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { authenticatedQuery } from '@/lib/access-control-queries'
import { handleServerError } from '@/app/api/utils'
import type { BoardWithCards } from '@/lib/types'

export const GET = async () => {
  try {
    const latestUpdatedBoards = await authenticatedQuery((userId) =>
      db.board.findMany({
        where: {
          members: {
            some: {
              userId,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
        take: 2,
        select: {
          id: true,
          title: true,
          cards: {
            orderBy: { createdAt: 'desc' },
            where: {
              OR: [
                { image: { isNot: null } },
                { link: { image: { isNot: null } } },
              ],
            },
            include: { image: true, link: { include: { image: true } } },
            take: 1,
          },
        },
      }),
    )

    const response: BoardsLatestUpdatedResponse = latestUpdatedBoards
    return NextResponse.json(response)
  } catch (error) {
    handleServerError(error, '[BOARDS_LATEST_UPDATED_API_ERROR]')
  }
}

export type BoardsLatestUpdatedResponse =
  | Pick<BoardWithCards, 'id' | 'title' | 'cards'>[]
  | null
