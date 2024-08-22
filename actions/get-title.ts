'use server'

import { z } from 'zod'

import { memberActionClient } from './utils/safe-action'
import { db } from '@/lib/db'

export const getTitle = memberActionClient
  .schema(
    z
      .object({
        boardId: z.string().cuid(),
        cardId: z.string().cuid(),
      })
      .partial()
      .refine((data) => !!data.boardId || !!data.cardId),
  )
  .action(async ({ parsedInput: { boardId, cardId } }) => {
    if (boardId) {
      const board = await db.board.findUnique({
        where: { id: boardId },
        select: { id: true, title: true },
      })

      if (!board) return undefined
      return [{ ...board, type: 'board' }]
    } else if (cardId) {
      const card = await db.card.findUnique({
        where: { id: cardId },
        select: {
          parentBoard: { select: { id: true, title: true } },
          id: true,
          image: { select: { url: true } },
          link: { select: { title: true, url: true } },
        },
      })

      if (!card) return undefined
      return [
        {
          title: card.parentBoard.title,
          id: card.parentBoard.id,
          type: 'board',
        },
        {
          title: card.image?.url || card.link?.title || card.link?.url,
          id: card.id,
          type: 'card',
        },
      ]
    }
  })
