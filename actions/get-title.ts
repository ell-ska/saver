'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { memberAction } from '@/lib/safeAction'

const schema = z.object({
  boardId: z.string().cuid(),
})

export const getTitle = memberAction(schema, async ({ boardId }) => {
  return await db.board.findUnique({
    where: { id: boardId },
    select: { id: true, title: true },
  })
})
