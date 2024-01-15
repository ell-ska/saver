import { create } from 'zustand'
import { z } from 'zod'

import { createLinkCardSchema } from '@/lib/schemas'

export type menuType =
  | 'add'
  | 'home'
  | 'board'
  | 'card'
  | 'confirm'
  | 'pick-board'
  | 'collaborators'
  | 'add-link'
  | 'add-image'

const linkSchema = createLinkCardSchema.omit({ parentBoardId: true })

type menuData = {
  pickBoard?: {
    type: 'move' | 'add' | 'copy'
    values: z.infer<typeof linkSchema>
  }
}

type menu = {
  type: menuType | null
  data: menuData
  isOpen: boolean
  open: (type: menuType, data?: menuData) => void
  close: () => void
}

export const useMenu = create<menu>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  open: (type, data = {}) => set({ isOpen: true, type, data }),
  close: () => set({ isOpen: false, type: null }),
}))
