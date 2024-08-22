'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { ownerAction } from './utils/safe-action'
import { db } from '@/lib/db'

const schema = z.object({
  boardId: z.string().cuid(),
})

export const deleteBoard = ownerAction(schema, async ({ boardId }) => {
  try {
    await db.board.delete({ where: { id: boardId } })
  } catch (error) {
    console.log('DELETE_BOARD_ACTION_ERROR', error)
    throw Error('something went wrong when deleting the board')
  }

  revalidatePath('/home')
  redirect('/home')
})
