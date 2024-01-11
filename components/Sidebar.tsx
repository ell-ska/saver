'use client'

import Link from 'next/link'
import { ChevronsLeft } from 'lucide-react'

import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/utils/classnames'
import SidebarNavigation from '@/components/SidebarNavigation'
import Button from '@/components/ui/Button'

type SidebarProps = { className: string }

const Sidebar = ({ className }: SidebarProps) => {
  const {
    sidebarRef,
    isCollapsed,
    isTransitioning,
    collapse,
    resetWidth,
    resize,
  } = useSidebar()

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        className,
        'group/sidebar relative w-60 bg-slate-50 text-slate-400',
        isTransitioning && 'transition-all',
        isCollapsed && 'invisible',
      )}
    >
      <div
        onMouseDown={resize.handleMouseDown}
        onClick={resetWidth}
        className='absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-slate-200 opacity-0 transition group-hover/sidebar:opacity-100'
      />
      <div className='flex h-full flex-col justify-between px-4 py-6'>
        <div>
          <div className='flex items-center justify-between'>
            <Link href='/home' className='font-branding text-xl text-primary'>
              saver
            </Link>
            <Button
              onClick={collapse}
              variant='ghost'
              size='icon'
              className='opacity-0 group-hover/sidebar:opacity-100'
              icon={<ChevronsLeft size={20} />}
            />
          </div>
          <div>favorites</div>
          <div>boards</div>
        </div>
        <SidebarNavigation />
      </div>
    </aside>
  )
}

export default Sidebar
