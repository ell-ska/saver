import { db } from './db'
import { auth } from '@/auth'

export const authenticatedQuery = async <T>(
  query: (userId: string) => Promise<T>,
  options?: Options,
): Promise<T | null> => {
  const session = await auth()
  if (!session?.user) return handleAccessDenied(options?.throwOnAccessDenied)

  return query(session.user.id)
}

export const memberQuery = async <T>(
  { cardId, boardId }: CardOrBoardId,
  query: () => Promise<T>,
  options?: Options,
): Promise<T | null> => {
  const session = await auth()
  if (!session?.user) return handleAccessDenied(options?.throwOnAccessDenied)

  if (cardId) {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
        parentBoard: {
          members: { some: { userId: session.user.id } },
        },
      },
    })

    if (!card) return handleAccessDenied(options?.throwOnAccessDenied)
  }

  if (boardId) {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        members: { some: { userId: session.user.id } },
      },
    })

    if (!board) return handleAccessDenied(options?.throwOnAccessDenied)
  }

  return query()
}

export const ownerQuery = async <T>(
  { cardId, boardId }: CardOrBoardId,
  query: () => Promise<T>,
  options?: Options,
): Promise<T | null> => {
  const session = await auth()
  if (!session?.user) return handleAccessDenied(options?.throwOnAccessDenied)

  if (cardId) {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
        parentBoard: {
          members: { some: { userId: session.user.id, role: 'OWNER' } },
        },
      },
    })

    if (!card) return handleAccessDenied(options?.throwOnAccessDenied)
  }

  if (boardId) {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        members: { some: { userId: session.user.id, role: 'OWNER' } },
      },
    })

    if (!board) return handleAccessDenied(options?.throwOnAccessDenied)
  }

  return query()
}

const handleAccessDenied = (throwOnAccessDenied: boolean = false) => {
  if (throwOnAccessDenied) {
    throw new AccessDeniedError()
  } else {
    return null
  }
}

class AccessDeniedError extends Error {}

type CardOrBoardId =
  | { cardId: string; boardId?: never }
  | { cardId?: never; boardId: string }

type Options = {
  throwOnAccessDenied?: boolean
}
