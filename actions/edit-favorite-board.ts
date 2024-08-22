'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { memberActionClient } from './utils/safe-action'
import { db } from '@/lib/db'

export const editFavoriteBoard = memberActionClient
  .schema(
    z.object({
      boardId: z.string().cuid(),
      isFavorite: z.boolean(),
    }),
  )
  .action(async ({ parsedInput: { boardId, isFavorite } }) => {
    try {
      await db.board.update({
        where: { id: boardId },
        data: { isFavorite },
      })
    } catch (error) {
      console.log('TOGGLE_FAVORITE_BOARD_ACTION_ERROR', error)
      throw Error('something went wrong')
    }

    revalidatePath('/home')
    revalidatePath(`/board/${boardId}`)
  })
