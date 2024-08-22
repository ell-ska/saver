'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { authAction } from './utils/safe-action'
import { createCard } from './create-card'
import { boardDetailsSchema, cardWithoutParentIdSchema } from '@/lib/schemas'
import { db } from '@/lib/db'

const schema = boardDetailsSchema.merge(
  z.object({
    card: cardWithoutParentIdSchema.optional(),
    isFavorite: z.boolean().optional(),
  }),
)

export const createBoard = authAction(
  schema,
  async ({ title, description, card, isFavorite }, { userId }) => {
    let board

    try {
      board = await db.board.create({
        data: {
          title,
          description,
          isFavorite,
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
  },
)
