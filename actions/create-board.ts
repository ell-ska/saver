'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { db } from '@/lib/db'
import { authAction } from '@/lib/safeAction'
import { boardDetailsSchema, cardWithoutParentIdSchema } from '@/lib/schemas'
import { createCard } from './create-card'

const schema = boardDetailsSchema.merge(
  z.object({
    card: cardWithoutParentIdSchema.optional(),
  }),
)

export const createBoard = authAction(schema, async (validated, { userId }) => {
  const { title, description, card } = validated
  let board

  try {
    board = await db.board.create({
      data: {
        title,
        description,
        members: {
          create: [{ userId, role: 'OWNER' }],
        },
      },
    })

    if (card) {
      await createCard({ ...card, parentBoardId: board.id })
    }
  } catch (error) {
    console.log('CREATE_BOARD_ACTION_ERROR', error)
    throw Error('something went wrong')
  }

  redirect(`/board/${board.id}`)
})
