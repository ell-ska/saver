'use server'

import { z } from 'zod'

import { memberAction } from './utils/safe-action'
import { db } from '@/lib/db'

const schema = z.object({
  boardId: z.string().cuid(),
})

export const getBoard = memberAction(schema, async ({ boardId }) => {
  return await db.board.findUnique({
    where: { id: boardId },
    include: {
      cards: {
        include: { image: true, link: { include: { image: true } } },
        orderBy: { updatedAt: 'asc' },
      },
    },
  })
})
