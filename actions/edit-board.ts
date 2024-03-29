'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { db } from '@/lib/db'
import { memberAction } from '@/lib/safeAction'
import { boardDetailsSchema } from '@/lib/schemas'

const schema = boardDetailsSchema.merge(
  z.object({ boardId: z.string().cuid() }),
)

export const editBoard = memberAction(
  schema,
  async ({ boardId, title, description }) => {
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
  },
)
