'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { memberAction } from '@/lib/safeAction'

const schema = z.object({
  cardId: z.string().cuid(),
})

export const getCard = memberAction(schema, async ({ cardId }) => {
  return await db.card.findUnique({
    where: { id: cardId },
    include: { image: true, link: true },
  })
})
