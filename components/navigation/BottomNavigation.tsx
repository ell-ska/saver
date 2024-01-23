'use client'

import {
  ArrowLeftRight,
  CircleUserRound,
  Copy,
  Eraser,
  Home,
  Inbox,
  Plus,
  Search,
  Share,
} from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import { useEdit } from '@/hooks/useEdit'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'

type BottomNavigationProps = { className: string }

const BottomNavigation = ({ className }: BottomNavigationProps) => {
  const [openMenu] = useMenu((state) => [state.open])
  const [editing, type] = useEdit((state) => [state.isEditing, state.type])
  const isEditing = editing && type === 'board'

  const base = [
    { key: 'home', asLink: true, href: '/home', icon: <Home /> },
    { key: 'search', asLink: true, href: '/search', icon: <Search /> },
    {
      key: 'add',
      onClick: () => {
        openMenu('add')
      },
      icon: <Plus />,
    },
    { key: 'sort-later', asLink: true, href: '/sort-later', icon: <Inbox /> },
    {
      key: 'profile',
      asLink: true,
      href: '/profile',
      icon: <CircleUserRound />,
    },
  ]

  const edit = [
    { key: 'move', icon: <ArrowLeftRight />, onClick: () => {} },
    { key: 'duplicate', icon: <Copy />, onClick: () => {} },
    { key: 'delete', icon: <Eraser />, onClick: () => {} },
    { key: 'share', icon: <Share />, onClick: () => {} },
  ]

  const options = isEditing ? edit : base

  return (
    <nav
      className={cn(
        'absolute bottom-0 z-30 flex w-full items-center justify-between bg-white px-12 py-4',
        className,
      )}
    >
      {options.map(({ key, ...option }) => (
        <Button key={key} {...option} variant='ghost' size='icon' />
      ))}
    </nav>
  )
}

export default BottomNavigation
