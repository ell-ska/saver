'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { memberActionClient } from './utils/safe-action'
import { db } from '@/lib/db'

export const deleteCards = memberActionClient
  .schema(
    z.object({
      boardId: z.string().cuid(),
      cards: z.array(z.string().cuid()),
    }),
  )
  .action(async ({ parsedInput: { boardId, cards } }) => {
    try {
      await db.card.deleteMany({ where: { id: { in: cards } } })
    } catch (error) {
      console.log('DELETE_CARD_ACTION_ERROR', error)
      throw Error('something went wrong when deleting the card')
    }

    revalidatePath(`/board/${boardId}`)
  })
