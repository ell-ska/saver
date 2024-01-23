import { create } from 'zustand'

import { editBoard } from '@/actions/edit-board'
import { DetailValues } from '@/lib/types'

type EditType = 'board' | 'card'

type Edit = {
  details?: DetailValues
}

type EditKey = keyof Edit

type EditStore = {
  type: EditType | null
  start: (type: EditType) => void
  cancel: () => void
  save: (key: EditKey) => void
  edit: Edit
  isEditing: boolean
  registerEdit: (edit: Edit) => void
  allCards: string[]
  setAllCards: (ids: string[]) => void
  selected: string[]
  toggleSelected: (cardId: string) => void
  toggleSelectAll: () => void
}

export const useEdit = create<EditStore>((set, get) => ({
  type: null,
  start: (type) => set({ isEditing: true, type }),
  cancel: () => set({ isEditing: false, type: null, selected: [], edit: {} }),
  save: (key) => {
    if (key === 'details') {
      const details = get().edit.details
      if (!details) return

      editBoard(details)
      get().cancel()
    }
  },
  edit: {},
  isEditing: false,
  registerEdit: (edit) => set({ edit }),
  allCards: [],
  setAllCards: (ids) => set({ allCards: ids }),
  selected: [],
  toggleSelected: (cardId) => {
    const isSelected = get().selected.includes(cardId)

    if (isSelected) {
      set({ selected: get().selected.filter((id) => id !== cardId) })
    } else {
      set({ selected: [...get().selected, cardId] })
    }
  },
  toggleSelectAll: () => {
    if (get().selected.length < get().allCards.length) {
      set({ selected: get().allCards })
    } else {
      set({ selected: [] })
    }
  },
}))
