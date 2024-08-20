'use server'

import { revalidatePath } from 'next/cache'

import { db } from '@/lib/db'
import { memberAction } from '@/lib/safeAction'
import { createCardSchema } from '@/lib/schemas'
import { generateCardData } from '@/lib/generateCardData'

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
