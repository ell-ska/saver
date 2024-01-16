import { z } from 'zod'

import { createImageCardSchema, createLinkCardSchema } from '@/lib/schemas'

const linkSchema = createLinkCardSchema.omit({ parentBoardId: true })
const imageSchema = createImageCardSchema.omit({ parentBoardId: true })

export type PickBoardValues =
  | z.infer<typeof linkSchema>
  | z.infer<typeof imageSchema>

export type PickBoardType = 'move' | 'add' | 'copy'
