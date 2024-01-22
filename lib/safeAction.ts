import { redirect } from 'next/navigation'
import { createSafeActionClient, DEFAULT_SERVER_ERROR } from 'next-safe-action'
import { z } from 'zod'

import { auth } from '@/auth'
import { db } from '@/lib/db'

const schema = z
  .object({
    boardId: z.string().cuid(),
    parentBoardId: z.string().cuid(),
    cardId: z.string().cuid(),
  })
  .partial()
  .refine((data) => !!data.boardId || !!data.parentBoardId || !!data.cardId)

const validateInput = (input: unknown) => {
  const validatedInput = schema.safeParse(input)
  if (!validatedInput.success) throw Error('no board or card id')

  const { boardId, parentBoardId, cardId } = validatedInput.data
  return { boardId, parentBoardId, cardId }
}

const authenticate = async () => {
  const session = await auth()
  if (!session?.user) return redirect('/auth/log-in')

  return { userId: session.user.id }
}

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
    return await authenticate()
  },
})

export const memberAction = createSafeActionClient({
  handleReturnedServerError,
  middleware: async (input) => {
    const { userId } = await authenticate()
    const { boardId, cardId, parentBoardId } = validateInput(input)
    let board, card

    if (boardId || parentBoardId) {
      board = await db.board.findUnique({
        where: {
          id: boardId || parentBoardId,
          members: { some: { userId } },
        },
      })
    } else if (cardId) {
      card = await db.card.findUnique({
        where: {
          id: cardId,
          parentBoard: {
            members: { some: { userId } },
          },
        },
      })
    }

    if (!board && !card) throw Error('NOT_FOUND')
  },
})

export const ownerAction = createSafeActionClient({
  handleReturnedServerError,
  middleware: async (input) => {
    const { userId } = await authenticate()
    const { boardId, cardId, parentBoardId } = validateInput(input)
    let board, card

    if (boardId || parentBoardId) {
      board = await db.board.findUnique({
        where: {
          id: boardId || parentBoardId,
          members: { some: { userId, role: 'OWNER' } },
        },
      })
    } else if (cardId) {
      card = await db.card.findUnique({
        where: {
          id: cardId,
          parentBoard: {
            members: { some: { userId, role: 'OWNER' } },
          },
        },
      })
    }

    if (!board && !card) throw Error('NOT_FOUND')
  },
})
