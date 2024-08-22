'use server'

import { z } from 'zod'

import { memberActionClient } from './utils/safe-action'
import { db } from '@/lib/db'

export const getIsFavoriteBoard = memberActionClient
  .schema(
    z.object({
      boardId: z.string().cuid(),
    }),
  )
  .action(async ({ parsedInput: { boardId } }) => {
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
