import { z } from 'zod'
import type { Board, Card, Image, Link } from '@prisma/client'

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

export type PreviewBoard = Pick<
  BoardWithCards,
  'id' | 'title' | 'cards' | 'isFavorite'
> & {
  _count: { [key: string]: number }
}

export type CardSize = 'default' | 'preview'
