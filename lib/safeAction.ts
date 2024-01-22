import { redirect } from 'next/navigation'
import { createSafeActionClient, DEFAULT_SERVER_ERROR } from 'next-safe-action'
import { z } from 'zod'

import { auth } from '@/auth'
import { db } from '@/lib/db'

const handleReturnedServerError = (error: Error) => {
  if (error.message) return error.message
  return DEFAULT_SERVER_ERROR
}

export const action = createSafeActionClient({
  handleReturnedServerError,
})

export const authAction = createSafeActionClient({
  handleReturnedServerError,
  middleware: async () => {
    const session = await auth()
    if (!session?.user) return redirect('/auth/log-in')

    return { userId: session.user.id }
  },
})

export const memberAction = createSafeActionClient({
  handleReturnedServerError,
  middleware: async (input) => {
    const schema = z
      .object({
        boardId: z.string().cuid(),
        parentBoardId: z.string().cuid(),
        cardId: z.string().cuid(),
      })
      .partial()
      .refine((data) => !!data.boardId || !!data.parentBoardId || !!data.cardId)

    const validatedInput = schema.safeParse(input)
    if (!validatedInput.success) throw Error('no board or card id')

    const session = await auth()
    if (!session?.user) return redirect('/auth/log-in')

    const { boardId, parentBoardId, cardId } = validatedInput.data
    let board, card

    if (boardId || parentBoardId) {
      board = await db.board.findUnique({
        where: {
          id: boardId || parentBoardId,
          members: { some: { userId: session.user.id } },
        },
      })
    } else if (cardId) {
      card = await db.card.findUnique({
        where: {
          id: cardId,
          parentBoard: {
            members: { some: { userId: session.user.id } },
          },
        },
      })
    }

    if (!board && !card) throw Error('NOT_FOUND')
  },
})
