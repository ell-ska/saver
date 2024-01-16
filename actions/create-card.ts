'use server'

import { z } from 'zod'
import { Card } from '@prisma/client'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { createCardSchema } from '@/lib/schemas'
// import { generateCardData } from '@/lib/generateCardData'
import { ActionReturn, createSafeAction } from '@/utils/createSafeAction'

const handler = async (
  values: z.infer<typeof createCardSchema>,
): Promise<ActionReturn<Card>> => {
  const session = await auth()
  if (!session?.user) return { error: 'unauthenticated' }

  const { parentBoardId, type, caption, ...cardData } = values

  const parentBoard = await db.board.findUnique({
    where: { id: parentBoardId },
    include: { members: true },
  })
  if (!parentBoard) return { error: 'no parent board found' }

  const isMember = parentBoard?.members.find(
    (member) => member.userId === session.user?.id,
  )
  if (!isMember) return { error: 'unauthorized' }

  // const data = await generateCardData(values)
  // if (!data) return { error: 'missing data' }

  let card

  // try {
  //   card = await db.card.create({
  //     data: { parentBoardId, type, caption, ...data },
  //   })
  // } catch (error) {
  //   console.log('CREATE_CARD_ACTION_ERROR', error)
  //   return { error: 'something went wrong' }
  // }

  return { data: card }
}

export const createCard = createSafeAction(handler, createCardSchema)
