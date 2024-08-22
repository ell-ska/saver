'use server'

import { z } from 'zod'

import { memberActionClient } from './utils/safe-action'
import { db } from '@/lib/db'

export const getBoard = memberActionClient
  .schema(
    z.object({
      boardId: z.string().cuid(),
    }),
  )
  .action(async ({ parsedInput: { boardId } }) => {
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
