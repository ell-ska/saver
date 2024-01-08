import { create } from 'zustand'

type NavigationStore = {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export const useNavigation = create<NavigationStore>((set) => ({
  isCollapsed: false,
  setIsCollapsed: (value) => set({ isCollapsed: value }),
}))
