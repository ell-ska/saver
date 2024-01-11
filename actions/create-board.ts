'use server'

import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const createBoard = async () => {
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