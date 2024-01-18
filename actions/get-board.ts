'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { memberAction } from '@/lib/safeAction'

const schema = z.object({
  boardId: z.string(),
})

export const getBoard = memberAction(schema, async ({ boardId }) => {
  return await db.board.findUnique({
    where: { id: boardId },
    include: {
      cards: { include: { image: true, link: { include: { image: true } } } },
    },
  })
})
