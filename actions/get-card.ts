'use server'

import { z } from 'zod'

import { memberActionClient } from './utils/safe-action'
import { db } from '@/lib/db'

export const getCard = memberActionClient
  .schema(
    z.object({
      cardId: z.string().cuid(),
    }),
  )
  .action(async ({ parsedInput: { cardId } }) => {
    return await db.card.findUnique({
      where: { id: cardId },
      include: { image: true, link: { include: { image: true } } },
    })
  })
