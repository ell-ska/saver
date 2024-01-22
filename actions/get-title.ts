'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { memberAction } from '@/lib/safeAction'

const schema = z
  .object({
    boardId: z.string().cuid(),
    cardId: z.string().cuid(),
  })
  .partial()
  .refine((data) => !!data.boardId || !!data.cardId)

export const getTitle = memberAction(schema, async ({ boardId, cardId }) => {
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
      { title: card.parentBoard.title, id: card.parentBoard.id, type: 'board' },
      {
        title: card.image?.url || card.link?.title || card.link?.url,
        id: card.id,
        type: 'card',
      },
    ]
  }
})
