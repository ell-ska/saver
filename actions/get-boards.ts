'use server'

import { z } from 'zod'

import { db } from '@/lib/db'
import { authAction } from '@/lib/safeAction'
import { HomePageBoard } from '@/lib/types'

const schema = z.array(
  z.object({
    title: z.enum(['all', 'favorites', 'where you left off']),
    limit: z.number().optional(),
  }),
)

export const getBoards = authAction(schema, async (params, { userId }) => {
  let boards: {
    [key: string]: HomePageBoard[]
  } = {}

  for (const { title, limit } of params) {
    let where, orderBy

    if (title === 'favorites') {
      where = { isFavorite: true }
    } else if (title === 'where you left off') {
      orderBy = { createdAt: 'desc' } as const
    }

    const response = await db.board.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
        ...where,
      },
      select: {
        id: true,
        title: true,
        cards: {
          take: 3,
          include: { image: true, link: { include: { image: true } } },
        },
        _count: true,
      },
      orderBy,
      take: limit,
    })

    boards = { ...boards, [title]: response }
  }

  return boards
})
