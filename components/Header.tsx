'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronsRight, MoreVertical, PlusCircle, Search } from 'lucide-react'

import { useSidebar } from '@/hooks/useSidebar'
import { useMenu } from '@/hooks/useMenu'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'
import Breadcrumbs from '@/components/Breadcrumbs'

const Header = () => {
  const [openMenu] = useMenu((state) => [state.open])
  const [isCollapsed, openSidebar] = useSidebar((state) => [
    state.isCollapsed,
    state.resetWidth,
  ])

  // change to dynamic when implemented
  const isEditing = false

  const path = usePathname()
  const isHomeRoute = path.includes('/home')
  const isBoardRoute = path.includes('/board')
  const isCardRoute = path.includes('/card')

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-white px-4 md:px-8',
      )}
    >
      <div className='flex overflow-hidden'>
        {isHomeRoute && (
          <Link
            href='/home'
            className='font-branding text-xl text-primary md:hidden'
          >
            saver
          </Link>
        )}
        {!isHomeRoute && !isEditing && (
          <>
            <Button
              onClick={openSidebar}
              variant='ghost'
              size='icon'
              className={cn('hidden', isCollapsed && 'inline-flex')}
              icon={<ChevronsRight />}
            />
            <Breadcrumbs />
          </>
        )}
      </div>
      {isEditing && !isHomeRoute ? (
        <div className='flex w-full items-center justify-between'>
          <Button variant='ghost'>select all</Button>
          <span className='text-sm text-slate-400'>items selected</span>
          <Button variant='ghost'>cancel</Button>
        </div>
      ) : (
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
          <Button
            onClick={() => {
              if (isBoardRoute) {
                openMenu('board')
              } else if (isCardRoute) {
                openMenu('card')
              }
            }}
            variant='ghost'
            size='icon'
            icon={<MoreVertical />}
          />
        </div>
      )}
    </header>
  )
}

export default Header
