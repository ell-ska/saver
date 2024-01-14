'use server'

import { z } from 'zod'
import { Card, CardType } from '@prisma/client'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { createCardSchema, createLinkCardSchema } from '@/lib/schemas'
import type { ActionReturn } from '@/lib/types'

export const createCard = async (
  values: z.infer<typeof createCardSchema>,
): Promise<ActionReturn<Card>> => {
  const session = await auth()
  if (!session?.user) return { error: 'unauthenticated' }

  const validatedValues = createCardSchema.safeParse(values)
  if (!validatedValues.success) return { error: 'invalid fields' }

  const { parentBoardId, type, caption, ...validatedData } =
    validatedValues.data

  const parentBoard = await db.board.findUnique({
    where: { id: parentBoardId },
    include: { members: true },
  })
  if (!parentBoard) return { error: 'no parent board found' }

  const isMember = parentBoard?.members.find(
    (member) => member.userId === session.user?.id,
  )
  if (!isMember) return { error: 'unauthorized' }

  let data

  switch (type) {
    case CardType.LINK:
      // TODO: generate og data from url
      const { url } = validatedData as z.infer<typeof createLinkCardSchema>

      data = {
        link: {
          create: { url },
        },
      }
      break
    case CardType.IMAGE:
      // TODO: upload image to edgestore or attach url
      data = {}
      break
  }

  let card

  try {
    card = await db.card.create({
      data: { parentBoardId, type, caption, ...data },
    })
  } catch (error) {
    console.log('CREATE_CARD_ACTION_ERROR', error)
    return { error: 'something went wrong' }
  }

  return { data: card }
}
