import { redirect } from 'next/navigation'
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action'
import { z } from 'zod'

import { auth } from '@/auth'
import { db } from '@/lib/data/db'

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error.message) throw error
    throw Error(DEFAULT_SERVER_ERROR_MESSAGE)
  },
})

export const authActionClient = actionClient.use(async ({ next }) => {
  const session = await auth()
  if (!session?.user?.id) return redirect('/auth/log-in')

  return next({ ctx: { userId: session.user.id } })
})

const boardOrCardSchema = z
  .object({
    boardId: z.string().cuid(),
    parentBoardId: z.string().cuid(),
    cardId: z.string().cuid(),
  })
  .partial()
  .refine((data) => data.boardId || data.parentBoardId || data.cardId)

const boardOrCardActionClient = authActionClient.use(
  async ({ clientInput, ctx, next }) => {
    const validatedInput = boardOrCardSchema.safeParse(clientInput)
    if (!validatedInput.success) throw Error('no board or card id')

    return next({
      ctx: {
        ...ctx,
        cardId: validatedInput.data.cardId,
        boardId:
          validatedInput.data.boardId || validatedInput.data.parentBoardId,
      },
    })
  },
)

export const memberActionClient = boardOrCardActionClient.use(
  async ({ ctx: { userId, cardId, boardId }, next }) => {
    let board, card

    if (boardId) {
      board = await db.board.findUnique({
        where: {
          id: boardId,
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

    return next({ ctx: { userId, cardId, boardId } })
  },
)

export const ownerActionClient = boardOrCardActionClient.use(
  async ({ ctx: { userId, cardId, boardId }, next }) => {
    let board, card

    if (boardId) {
      board = await db.board.findUnique({
        where: {
          id: boardId,
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

    return next({ ctx: { userId, cardId, boardId } })
  },
)
