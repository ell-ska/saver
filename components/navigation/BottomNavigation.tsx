'use client'

import { useParams } from 'next/navigation'
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

import { deleteCards } from '@/actions/delete-cards'
import { useMenu } from '@/hooks/useMenu'
import { useEdit } from '@/hooks/useEdit'
import { toast } from '@/utils/toast'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'

type BottomNavigationProps = { className: string }

const BottomNavigation = ({ className }: BottomNavigationProps) => {
  const [openMenu] = useMenu((state) => [state.open])
  const [editing, type, selected, cancelEditing] = useEdit((state) => [
    state.isEditing,
    state.type,
    state.selected,
    state.cancel,
  ])
  const isEditing = editing && type === 'board'

  const { boardId } = useParams<{ boardId: string }>()

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
    {
      key: 'move',
      icon: <ArrowLeftRight />,
      onClick: () => toast('moving cards has not been implemented yet'),
    },
    {
      key: 'duplicate',
      icon: <Copy />,
      onClick: () => toast('duplicating cards has not been implemented yet'),
    },
    {
      key: 'delete',
      icon: <Eraser />,
      onClick: async () => {
        if (!selected.length) return toast('no cards selected')

        deleteCards({ boardId, cards: selected })
        cancelEditing()
      },
    },
    {
      key: 'share',
      icon: <Share />,
      onClick: () => toast('sharing cards has not been implemented yet'),
    },
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
