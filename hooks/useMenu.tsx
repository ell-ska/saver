import { create } from 'zustand'

export type menuType =
  | 'add'
  | 'home'
  | 'board'
  | 'card'
  | 'confirm'
  | 'move'
  | 'image'
  | 'collaborators'

type menu = {
  type: menuType | null
  isOpen: boolean
  onOpen: (type: menuType) => void
  onClose: () => void
}

export const useMenu = create<menu>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
}))
