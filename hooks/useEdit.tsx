import { create } from 'zustand'

import { DetailValues } from '@/lib/types'
import { editBoard } from '@/actions/edit-board'

type EditType = 'board' | 'card'

type Edit = {
  details?: DetailValues
}

type EditKey = keyof Edit

type EditStore = {
  edit: Edit
  type: EditType | null
  isEditing: boolean
  registerEdit: (edit: Edit) => void
  start: (type: EditType) => void
  cancel: () => void
  save: (key: EditKey) => void
}

export const useEdit = create<EditStore>((set, get) => ({
  edit: {},
  type: null,
  isEditing: false,
  registerEdit: (edit) => set({ edit }),
  start: (type) => set({ isEditing: true, type }),
  cancel: () => set({ isEditing: false, type: null }),
  save: (key) => {
    if (key === 'details') {
      const details = get().edit.details
      if (!details) return

      editBoard(details)
      set({ isEditing: false, type: null, edit: {} })
    }
  },
}))
