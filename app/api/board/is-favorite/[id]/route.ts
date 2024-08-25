import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { memberQuery } from '@/lib/access-control-queries'
import { handleServerError } from '@/app/api/utils'

export const GET = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    const board = await memberQuery({ boardId: id }, () =>
      db.board.findUnique({
        where: { id },
        select: { isFavorite: true },
      }),
    )

    if (!board) {
      return new NextResponse(null, {
        status: 404,
        statusText: 'board not found',
      })
    }

    const response: BoardIsFavoriteResponse = board

    return NextResponse.json(response)
  } catch (error) {
    handleServerError(error, '[BOARD_IS_FAVORITE_API_ERROR]')
  }
}

export type BoardIsFavoriteResponse = {
  isFavorite: boolean
}
