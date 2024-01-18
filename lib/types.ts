import { Board, Card, Image, Link } from '@prisma/client'
import { string, z } from 'zod'

import { createImageCardSchema, createLinkCardSchema } from '@/lib/schemas'

const linkSchema = createLinkCardSchema.omit({ parentBoardId: true })
const imageSchema = createImageCardSchema.omit({ parentBoardId: true })

export type PickBoardValues =
  | z.infer<typeof linkSchema>
  | z.infer<typeof imageSchema>

export type PickBoardType = 'move' | 'add' | 'copy'

export type CardWithNested = Card & {
  image: Image | null
  link: (Link & { image: Image | null }) | null
}

export type BoardWithCards = Board & {
  cards: CardWithNested[] | undefined
}

export type SimpleBoard = Pick<BoardWithCards, 'id' | 'title' | 'cards'> & {
  _count: { [key: string]: number }
}

export type SimpleBoardsWithKeys = { [key: string]: SimpleBoard[] }

export type CardSize = 'default' | 'preview'
