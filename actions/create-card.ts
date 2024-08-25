'use server'

import { revalidatePath } from 'next/cache'

import { memberActionClient } from './utils/safe-action'
import { generateCardData } from '@/lib/generateCardData'
import { createCardSchema } from '@/lib/schemas'
import { db } from '@/lib/data/db'

export const createCard = memberActionClient
  .schema(createCardSchema)
  .action(async ({ parsedInput }) => {
    try {
      const cardData = await generateCardData(parsedInput)
      const { parentBoardId, type, caption } = parsedInput

      const card = await db.card.create({
        data: { parentBoardId, type, caption, ...cardData },
      })

      revalidatePath(`/board/${parentBoardId}`)
      return card
    } catch (error) {
      console.log('CREATE_CARD_ACTION_ERROR', error)
      throw Error('something went wrong')
    }
  })
