'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { ownerActionClient } from './utils/safe-action'
import { db } from '@/lib/data/db'

export const deleteBoard = ownerActionClient
  .schema(
    z.object({
      boardId: z.string().cuid(),
    }),
  )
  .action(async ({ parsedInput: { boardId } }) => {
    try {
      await db.board.delete({ where: { id: boardId } })
    } catch (error) {
      console.log('DELETE_BOARD_ACTION_ERROR', error)
      throw Error('something went wrong when deleting the board')
    }

    revalidatePath('/home')
    redirect('/home')
  })
