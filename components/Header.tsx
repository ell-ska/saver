'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronsRight, MoreVertical, PlusCircle, Search } from 'lucide-react'

import { useSidebar } from '@/hooks/useSidebar'
import { useMenu } from '@/hooks/useMenu'
import { useEdit } from '@/hooks/useEdit'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'
import Breadcrumbs from '@/components/Breadcrumbs'

const Header = () => {
  const [isCollapsed, openSidebar] = useSidebar((state) => [
    state.isCollapsed,
    state.resetWidth,
  ])
  const [openMenu] = useMenu((state) => [state.open])
  const [
    editing,
    type,
    cancelEditing,
    saveEdits,
    edit,
    selected,
    selectAll,
    allCardsLength,
  ] = useEdit((state) => [
    state.isEditing,
    state.type,
    state.cancel,
    state.save,
    state.edit,
    state.selected,
    state.toggleSelectAll,
    state.allCards.length,
  ])
  const isEditing = editing && type === 'board'

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
        {isHomeRoute && (
          <Button
            onClick={openSidebar}
            variant='ghost'
            size='icon'
            className={cn('hidden', isCollapsed && 'inline-flex')}
            icon={<ChevronsRight />}
          />
        )}
        {!isHomeRoute && !isEditing && <Breadcrumbs />}
      </div>
      {isEditing && !isHomeRoute ? (
        <div className='flex w-full items-center justify-between'>
          <Button onClick={selectAll} variant='ghost'>
            {selected.length < allCardsLength ? 'select all' : 'deselect all'}
          </Button>
          <span className='text-sm text-slate-400'>
            {selected.length} item{selected.length === 1 ? '' : 's'} selected
          </span>
          {Object.keys(edit).length > 0 ? (
            <Button onClick={() => saveEdits('details')} variant='ghost'>
              save
            </Button>
          ) : (
            <Button onClick={cancelEditing} variant='ghost'>
              cancel
            </Button>
          )}
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
