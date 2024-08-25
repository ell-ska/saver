'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { memberActionClient } from './utils/safe-action'
import { db } from '@/lib/data/db'

export const deleteCard = memberActionClient
  .schema(
    z.object({
      cardId: z.string().cuid(),
    }),
  )
  .action(async ({ parsedInput: { cardId } }) => {
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
