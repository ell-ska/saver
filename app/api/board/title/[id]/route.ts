import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/lib/data/db'
import { memberQuery } from '@/lib/data/access-control-queries'
import { handleServerError } from '@/app/api/utils'

export const GET = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } },
) => {
  try {
    const board = await memberQuery({ boardId: id }, () =>
      db.board.findUnique({
        where: { id },
        select: { id: true, title: true },
      }),
    )

    if (!board) {
      return new NextResponse(null, {
        status: 404,
        statusText: 'board not found',
      })
    }

    const response: BoardTitleResponse = [{ ...board, type: 'board' }]

    return NextResponse.json(response)
  } catch (error) {
    handleServerError(error, '[BOARD_TITLE_API_ERROR]')
  }
}

export type BoardTitleResponse = {
  title: string
  id: string
  type: 'board'
}[]
