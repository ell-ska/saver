'use server'

import { z } from 'zod'
import { Card, CardType } from '@prisma/client'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { createCardSchema } from '@/lib/schemas'
import { ActionReturn, createSafeAction } from '@/utils/createSafeAction'
import { getOgData } from '@/utils/getOgData'

const handler = async (
  values: z.infer<typeof createCardSchema>,
): Promise<ActionReturn<Card>> => {
  const session = await auth()
  if (!session?.user) return { error: 'unauthenticated' }

  const { parentBoardId, type, caption, ...validatedData } = values

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
      const { url } = validatedData
      const ogData = await getOgData(url)

      const image = ogData?.image && {
        url: ogData.image.url,
        width: ogData.image.width || 500,
        height: ogData.image.height || 375,
      }

      data = {
        link: {
          create: {
            url,
            title: ogData?.title,
            description: ogData?.description,
            faviconUrl: ogData?.faviconUrl,
            image: image && {
              create: {
                ...image,
              },
            },
          },
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

export const createCard = createSafeAction(handler, createCardSchema)
