import { create } from 'zustand'

type EditType = 'board' | 'card'

type EditStore = {
  type: EditType | null
  isEditing: boolean
  start: (type: EditType) => void
  stop: () => void
}

export const useEdit = create<EditStore>((set) => ({
  type: null,
  isEditing: false,
  start: (type) => set({ isEditing: true, type }),
  stop: () => set({ isEditing: false, type: null }),
}))
