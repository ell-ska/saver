import { Board, Card, Image, Link } from '@prisma/client'
import { z } from 'zod'

import { boardDetailsSchema, cardWithoutParentIdSchema } from '@/lib/schemas'

export type PickBoardValues = z.infer<typeof cardWithoutParentIdSchema>

export type PickBoardType = 'move' | 'add' | 'copy'

export type ConfirmType = 'delete-board'

const boardDetailsSchemaWithId = boardDetailsSchema.merge(
  z.object({
    boardId: z.string().cuid(),
  }),
)
export type DetailValues = z.infer<typeof boardDetailsSchemaWithId>

export type CardWithNested = Card & {
  image: Image | null
  link: (Link & { image: Image | null }) | null
}

export type BoardWithCards = Board & {
  cards: CardWithNested[]
}

export type SimpleBoard = Pick<BoardWithCards, 'id' | 'title' | 'cards'> & {
  _count: { [key: string]: number }
}

export type SimpleBoardsWithKeys = { [key: string]: SimpleBoard[] }

export type CardSize = 'default' | 'preview'
