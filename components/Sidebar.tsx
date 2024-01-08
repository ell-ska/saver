'use client'

import { ElementRef, useRef, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ChevronsLeft, CircleUserRound, Inbox } from 'lucide-react'

import { useNavigation } from '@/hooks/useNavigation'
import { cn } from '@/utils/classnames'
import Button, { buttonVariants } from '@/components/ui/Button'

const Sidebar = () => {
  const user = useSession().data?.user

  const sidebarRef = useRef<ElementRef<'aside'>>(null)
  const isRezising = useRef(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { isCollapsed, setIsCollapsed } = useNavigation()

  const resize = {
    handleMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault()
      event.stopPropagation()

      isRezising.current = true
      document.addEventListener('mousemove', resize.handleMouseMove)
      document.addEventListener('mouseup', resize.handleMouseUp)
    },
    handleMouseMove: (event: MouseEvent) => {
      if (!isRezising.current) return

      let newWidth = event.clientX
      const maxWidth = 480
      const minWidth = 200

      if (newWidth < minWidth) newWidth = minWidth
      if (newWidth > maxWidth) newWidth = maxWidth

      if (sidebarRef.current) {
        sidebarRef.current.style.width = `${newWidth}px`
      }
    },
    handleMouseUp: () => {
      isRezising.current = false
      document.removeEventListener('mousemove', resize.handleMouseMove)
      document.removeEventListener('mouseup', resize.handleMouseUp)
    },
  }

  const collapse = () => {
    if (sidebarRef.current) {
      setIsCollapsed(true)
      setIsTransitioning(true)

      sidebarRef.current.style.width = '0'
      setTimeout(() => setIsTransitioning(false), 150)
    }
  }

  const resetWidth = () => {
    if (!sidebarRef.current) return

    setIsTransitioning(true)
    setIsCollapsed(false)

    const defaultWidth = 240
    sidebarRef.current.style.width = `${defaultWidth}px`

    setTimeout(() => setIsTransitioning(false), 150)
  }

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        'group/sidebar relative flex w-60 flex-col justify-between bg-slate-50 px-4 py-6 text-slate-400 opacity-100',
        isTransitioning && 'transition-all',
        isCollapsed && 'opacity-0',
      )}
    >
      <div
        onMouseDown={resize.handleMouseDown}
        onClick={resetWidth}
        className='absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-slate-200 opacity-0 transition group-hover/sidebar:opacity-100'
      />
      <div>
        <div className='flex items-center justify-between'>
          <Link href={`/home`} className='font-branding text-xl text-primary'>
            saver
          </Link>
          <Button
            onClick={collapse}
            variant='ghost'
            size='icon'
            className='opacity-0 group-hover/sidebar:opacity-100'
          >
            <ChevronsLeft size={20} />
          </Button>
        </div>
        <div>favorites</div>
        <div>boards</div>
      </div>
      <div className='flex flex-col'>
        <Link
          href='/sort-later'
          className={cn(
            buttonVariants({
              variant: 'ghost',
              className: 'justify-start gap-2 px-2 py-1',
            }),
          )}
        >
          <Inbox size={20} />
          <span>sort later</span>
        </Link>
        <Link
          href='/profile'
          className={cn(
            buttonVariants({
              variant: 'ghost',
              className: 'justify-start gap-2 px-2 py-1',
            }),
          )}
        >
          <CircleUserRound size={20} />
          <span>{user?.name}</span>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
