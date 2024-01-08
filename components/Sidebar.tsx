'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ChevronsLeft, CircleUserRound, Inbox } from 'lucide-react'

import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/utils/classnames'
import Button, { buttonVariants } from '@/components/ui/Button'

const Sidebar = () => {
  const user = useSession().data?.user
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
