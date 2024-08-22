'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { memberActionClient } from './utils/safe-action'
import { boardDetailsSchema } from '@/lib/schemas'
import { db } from '@/lib/db'

export const editBoard = memberActionClient
  .schema(boardDetailsSchema.merge(z.object({ boardId: z.string().cuid() })))
  .action(async ({ parsedInput: { boardId, title, description } }) => {
    let board

    try {
      board = await db.board.update({
        where: { id: boardId },
        data: { title, description },
      })
    } catch (error) {
      console.log('EDIT_BOARD_ACTION_ERROR', error)
      throw Error('something went wrong')
    }

    revalidatePath(`board/${board.id}`)
  })
