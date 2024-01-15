import { create } from 'zustand'

export type menuType =
  | 'add'
  | 'home'
  | 'board'
  | 'card'
  | 'confirm'
  | 'move'
  | 'collaborators'
  | 'add-link'
  | 'add-image'

type menu = {
  type: menuType | null
  isOpen: boolean
  open: (type: menuType) => void
  close: () => void
}

export const useMenu = create<menu>((set) => ({
  type: null,
  isOpen: false,
  open: (type) => set({ isOpen: true, type }),
  close: () => set({ isOpen: false, type: null }),
}))
