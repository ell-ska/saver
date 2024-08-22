'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { memberAction } from './utils/safe-action'
import { db } from '@/lib/db'

const schema = z.object({
  boardId: z.string().cuid(),
  cards: z.array(z.string().cuid()),
})

export const deleteCards = memberAction(schema, async ({ boardId, cards }) => {
  try {
    await db.card.deleteMany({ where: { id: { in: cards } } })
  } catch (error) {
    console.log('DELETE_CARD_ACTION_ERROR', error)
    throw Error('something went wrong when deleting the card')
  }

  revalidatePath(`/board/${boardId}`)
})
