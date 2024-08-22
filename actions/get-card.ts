'use server'

import { z } from 'zod'

import { memberAction } from './utils/safe-action'
import { db } from '@/lib/db'

const schema = z.object({
  cardId: z.string().cuid(),
})

export const getCard = memberAction(schema, async ({ cardId }) => {
  return await db.card.findUnique({
    where: { id: cardId },
    include: { image: true, link: { include: { image: true } } },
  })
})
