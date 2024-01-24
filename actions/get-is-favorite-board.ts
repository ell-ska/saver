'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { memberAction } from '@/lib/safeAction'

const schema = z.object({
  boardId: z.string().cuid(),
})

export const getIsFavoriteBoard = memberAction(schema, async ({ boardId }) => {
  try {
    return await db.board.findUnique({
      where: { id: boardId },
      select: { isFavorite: true },
    })
  } catch (error) {
    console.log('GET_IS_FAVORITE_BOARD_ACTION_ERROR', error)
    throw Error('something went wrong')
  }
})
