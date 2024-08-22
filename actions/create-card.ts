'use server'

import { revalidatePath } from 'next/cache'

import { memberAction } from './utils/safe-action'
import { generateCardData } from '@/lib/generateCardData'
import { createCardSchema } from '@/lib/schemas'
import { db } from '@/lib/db'

export const createCard = memberAction(createCardSchema, async (validated) => {
  try {
    const cardData = await generateCardData(validated)
    const { parentBoardId, type, caption } = validated

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
