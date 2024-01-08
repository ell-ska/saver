'use client'

import { ChevronsRight, MoreVertical, Search } from 'lucide-react'

import { useSidebar } from '@/hooks/useSidebar'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'

const Header = () => {
  const [isCollapsed, openSidebar] = useSidebar((state) => [
    state.isCollapsed,
    state.resetWidth,
  ])

  return (
    <header className='sticky top-0 flex w-full items-center justify-between bg-white p-4 md:px-8 md:py-6'>
      <div>
        <Button
          onClick={openSidebar}
          variant='ghost'
          size='icon'
          className={cn('hidden', isCollapsed && 'inline-flex')}
        >
          <ChevronsRight />
        </Button>
      </div>
      <div className='space-x-4'>
        <Button variant='ghost' size='icon' className='hidden md:inline-flex'>
          <Search />
        </Button>
        <Button variant='ghost' size='icon'>
          <MoreVertical />
        </Button>
      </div>
    </header>
  )
}

export default Header
