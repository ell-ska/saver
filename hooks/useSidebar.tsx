import { ElementRef, createRef } from 'react'
import { create } from 'zustand'

type SidebarStore = {
  sidebarRef: React.MutableRefObject<ElementRef<'aside'> | null>
  isResizing: React.MutableRefObject<boolean | null>
  isCollapsed: boolean
  isTransitioning: boolean
  collapse: () => void
  resetWidth: () => void
  resize: {
    handleMouseDown: (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => void
    handleMouseMove: (event: MouseEvent) => void
    handleMouseUp: () => void
  }
}

export const useSidebar = create<SidebarStore>((set, get) => ({
  sidebarRef: createRef(),
  isResizing: createRef(),
  isCollapsed: false,
  isTransitioning: false,
  collapse: () => {
    const sidebar = get().sidebarRef.current
    if (!sidebar) return

    set({ isTransitioning: true, isCollapsed: true })
    sidebar.style.width = '0'

    setTimeout(() => set({ isTransitioning: false }), 150)
  },
  resetWidth: () => {
    const sidebar = get().sidebarRef.current
    if (!sidebar) return

    set({ isTransitioning: true, isCollapsed: false })

    const defaultWidth = 240
    sidebar.style.width = `${defaultWidth}px`

    setTimeout(() => set({ isTransitioning: false }), 150)
  },
  resize: {
    handleMouseDown: (event) => {
      event.preventDefault()
      event.stopPropagation()

      get().isResizing.current = true
      document.addEventListener('mousemove', get().resize.handleMouseMove)
      document.addEventListener('mouseup', get().resize.handleMouseUp)
    },
    handleMouseMove: (event) => {
      const sidebar = get().sidebarRef.current
      if (!get().isResizing.current || !sidebar) return

      let newWidth = event.clientX
      const maxWidth = 480
      const minWidth = 200

      if (newWidth < minWidth) newWidth = minWidth
      if (newWidth > maxWidth) newWidth = maxWidth

      sidebar.style.width = `${newWidth}px`
    },
    handleMouseUp: () => {
      get().isResizing.current = false
      document.removeEventListener('mousemove', get().resize.handleMouseMove)
      document.removeEventListener('mouseup', get().resize.handleMouseUp)
    },
  },
}))
