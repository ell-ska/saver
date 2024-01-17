'use server'

import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { authAction } from '@/lib/safeAction'
import { boardDetailsSchema } from '@/lib/schemas'

export const createBoard = authAction(
  boardDetailsSchema,
  async (validated, { userId }) => {
    let board

    try {
      board = await db.board.create({
        data: {
          ...validated,
          members: {
            create: [{ userId, role: 'OWNER' }],
          },
        },
      })
    } catch (error) {
      console.log('CREATE_BOARD_ACTION_ERROR', error)
      throw Error('something went wrong')
    }

    redirect(`/board/${board.id}`)
  },
)
