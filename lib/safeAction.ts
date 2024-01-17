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
    const schema = z.object({ boardId: z.string() })

    const validatedInput = schema.safeParse(input)
    if (!validatedInput.success) throw Error('no board id')

    const session = await auth()
    if (!session?.user) return redirect('/auth/log-in')

    const board = await db.board.findUnique({
      where: {
        id: validatedInput.data.boardId,
        members: { some: { userId: session.user.id } },
      },
    })
    if (!board) throw Error('NOT_FOUND')
  },
})
