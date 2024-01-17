'use server'

import { db } from '@/lib/db'
import { memberAction } from '@/lib/safeAction'
import { createCardSchema } from '@/lib/schemas'
import { generateCardData } from '@/lib/generateCardData'

export const createCard = memberAction(createCardSchema, async (validated) => {
  const data = await generateCardData(validated)
  if (!data) throw Error('data missing')

  const { parentBoardId, type, caption } = validated
  let card

  try {
    card = await db.card.create({
      data: { parentBoardId, type, caption, ...data },
    })
  } catch (error) {
    console.log('CREATE_CARD_ACTION_ERROR', error)
    throw Error('something went wrong')
  }

  return card
})
