'use server'

import { z } from 'zod'

import { authAction } from './utils/safe-action'
import { db } from '@/lib/db'
import type { SimpleBoardsWithKeys } from '@/lib/types'

const schema = z.array(
  z.object({
    title: z.enum(['all', 'favorites', 'where you left off']),
    limit: z.number().optional(),
    previewImage: z.boolean().optional(),
  }),
)

export const getBoards = authAction(schema, async (params, { userId }) => {
  let boards: SimpleBoardsWithKeys = {}

  for (const { title, limit, previewImage } of params) {
    let where, orderBy

    if (title === 'favorites') {
      where = { isFavorite: true }
    } else if (title === 'where you left off') {
      orderBy = { updatedAt: 'desc' } as const // when does it actually update?
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
        cards: previewImage
          ? {
              where: {
                OR: [
                  { image: { isNot: null } },
                  { link: { image: { isNot: null } } },
                ],
              },
              orderBy: { createdAt: 'desc' },
              include: { image: true, link: { include: { image: true } } },
              take: 1,
            }
          : {
              orderBy: { createdAt: 'desc' },
              include: { image: true, link: { include: { image: true } } },
              take: 3,
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
