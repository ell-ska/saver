'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { ActionReturn, createSafeAction } from '@/utils/createSafeAction'

const handler = async (): Promise<ActionReturn<undefined>> => {
  const session = await auth()
  if (!session?.user) return { error: 'unauthenticated' }

  let board

  try {
    board = await db.board.create({
      data: {
        members: {
          create: [{ userId: session.user.id, role: 'OWNER' }],
        },
      },
    })
  } catch (error) {
    console.log('CREATE_BOARD_ACTION_ERROR', error)
    return { error: 'something went wrong' }
  }

  redirect(`/board/${board.id}`)
}

export const createBoard = createSafeAction(handler, z.object({}))
