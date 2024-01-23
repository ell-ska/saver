'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronsLeft } from 'lucide-react'

import { useSidebar } from '@/hooks/useSidebar'
import { SimpleBoardsWithKeys } from '@/lib/types'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'
import SidebarBoards from './SidebarBoards'
import SidebarOptions from './SidebarOptions'
import SidebarNavigation from './SidebarNavigation'

type SidebarProps = {
  className: string
  boards: SimpleBoardsWithKeys | undefined
}

const Sidebar = ({ className, boards }: SidebarProps) => {
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
      <div className='flex h-full flex-col justify-between gap-12 pb-5 pt-6'>
        <div className='flex flex-col gap-8 overflow-hidden'>
          <div className='flex items-center justify-between px-4'>
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
          {isCardBoardMenu ? (
            <SidebarOptions />
          ) : (
            boards && <SidebarBoards boards={boards} />
          )}
        </div>
        <SidebarNavigation isCardBoardMenu={isCardBoardMenu} />
      </div>
    </aside>
  )
}

export default Sidebar
