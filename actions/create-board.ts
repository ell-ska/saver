'use server'

import { redirect } from 'next/navigation'

import { db } from '@/lib/db'
import { authAction } from '@/lib/safeAction'
import { boardDetailsSchema } from '@/lib/schemas'

export const createBoard = authAction(
  boardDetailsSchema,
  async (data, { userId }) => {
    const board = await db.board.create({
      data: {
        ...data,
        members: {
          create: [{ userId, role: 'OWNER' }],
        },
      },
    })
    if (!board) throw Error('something went wrong')

    redirect(`/board/${board.id}`)
  },
)
