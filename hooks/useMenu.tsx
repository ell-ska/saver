import { create } from 'zustand'

import { ConfirmType, PickBoardType, PickBoardValues } from '@/lib/types'

export type MenuType =
  | 'add'
  | 'home'
  | 'board'
  | 'card'
  | 'confirm'
  | 'collaborators'
  | 'pick-board'
  | 'add-board'
  | 'add-link'
  | 'add-image'

type MenuData = {
  pickBoard?: {
    type: PickBoardType
    values: PickBoardValues
  }
  addBoard?: {
    values?: PickBoardValues
    isFavorite?: boolean
  }
  confirm?: {
    type: ConfirmType
    boardId: string
  }
}

type MenuStore = {
  type: MenuType | null
  data: MenuData
  isOpen: boolean
  open: (type: MenuType, data?: MenuData) => void
  close: () => void
}

export const useMenu = create<MenuStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  open: (type, data = {}) => set({ isOpen: true, type, data }),
  close: () => set({ isOpen: false, type: null }),
}))
