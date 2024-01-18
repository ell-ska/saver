'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronsLeft } from 'lucide-react'

import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'
import BoardNavigation from './BoardNavigation'
import SidebarAddMenu from './SidebarAddMenu'
import SidebarNavigation from './SidebarNavigation'

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

  const path = usePathname()
  const isCardBoardMenu = path.includes('/board') || path.includes('/card')

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        className,
        'group/sidebar relative shrink-0 bg-slate-50 text-slate-400',
        isTransitioning && 'transition-all',
        isCollapsed && 'invisible',
      )}
      style={{ width: isCardBoardMenu ? 'auto' : '240px' }}
    >
      {!isCardBoardMenu && (
        <div
          onMouseDown={resize.handleMouseDown}
          onClick={resetWidth}
          className='absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-slate-200 opacity-0 transition group-hover/sidebar:opacity-100'
        />
      )}
      <div className='flex h-full flex-col justify-between px-4 py-6'>
        <div className='space-y-12'>
          <div className='flex items-center justify-between'>
            <Link href='/home' className='font-branding text-xl text-primary'>
              saver
            </Link>
            {!isCardBoardMenu && (
              <Button
                onClick={collapse}
                variant='ghost'
                size='icon'
                className='opacity-0 group-hover/sidebar:opacity-100'
                icon={<ChevronsLeft size={20} />}
              />
            )}
          </div>
          {isCardBoardMenu ? <SidebarAddMenu /> : <BoardNavigation />}
        </div>
        <SidebarNavigation isCardBoardMenu={isCardBoardMenu} />
      </div>
    </aside>
  )
}

export default Sidebar
