import { create } from 'zustand'

import { PickBoardType, PickBoardValues } from '@/lib/types'

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

type menuData = {
  pickBoard?: {
    type: PickBoardType
    values: PickBoardValues
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
