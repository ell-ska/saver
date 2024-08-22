'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { memberAction } from './utils/safe-action'
import { db } from '@/lib/db'

const schema = z.object({
  cardId: z.string().cuid(),
})

export const deleteCard = memberAction(schema, async ({ cardId }) => {
  let card

  try {
    card = await db.card.delete({ where: { id: cardId } })
  } catch (error) {
    console.log('DELETE_CARD_ACTION_ERROR', error)
    throw Error('something went wrong when deleting the card')
  }

  revalidatePath(`/board/${card.parentBoardId}`)
  redirect(`/board/${card.parentBoardId}`)
})
