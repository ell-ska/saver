'use client'

import { ChevronsRight, MoreVertical, PlusCircle, Search } from 'lucide-react'

import { useSidebar } from '@/hooks/useSidebar'
import { useMenu } from '@/hooks/useMenu'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'

const Header = () => {
  const [openMenu] = useMenu((state) => [state.open])
  const [isCollapsed, openSidebar] = useSidebar((state) => [
    state.isCollapsed,
    state.resetWidth,
  ])

  return (
    <header className='sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-white px-4 md:px-8'>
      <div>
        <Button
          onClick={openSidebar}
          variant='ghost'
          size='icon'
          className={cn('hidden', isCollapsed && 'inline-flex')}
          icon={<ChevronsRight />}
        />
      </div>
      <div className='space-x-4'>
        <Button
          onClick={() => openMenu('add')}
          variant='ghost'
          size='icon'
          className='hidden md:inline-flex'
          icon={<PlusCircle />}
        />
        <Button
          variant='ghost'
          size='icon'
          className='hidden md:inline-flex'
          icon={<Search />}
        />
        <Button variant='ghost' size='icon' icon={<MoreVertical />} />
      </div>
    </header>
  )
}

export default Header
