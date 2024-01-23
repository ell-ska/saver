'use client'

import { useParams } from 'next/navigation'
import {
  ArrowLeftRight,
  Copy,
  Eraser,
  Image as ImageIcon,
  Link,
  PlusCircle,
  Share,
} from 'lucide-react'

import { deleteCards } from '@/actions/delete-cards'
import { useMenu } from '@/hooks/useMenu'
import { useEdit } from '@/hooks/useEdit'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'

type Option = { tooltip: string; icon: React.ReactNode; onClick: () => void }

const SidebarOptions = () => {
  const [openMenu] = useMenu((state) => [state.open])
  const [editing, type, selected, cancelEditing] = useEdit((state) => [
    state.isEditing,
    state.type,
    state.selected,
    state.cancel,
  ])
  const isEditing = editing && type === 'board'

  const { boardId } = useParams<{ boardId: string }>()

  const add: Option[] = [
    {
      tooltip: 'link',
      icon: <Link />,
      onClick: () => openMenu('add-link'),
    },
    {
      tooltip: 'image', // or video
      icon: <ImageIcon />,
      onClick: () => openMenu('add-image'),
    },
    // {
    //   tooltip: 'note',
    //   icon: <CaseSensitive />,
    //   onClick: () => {},
    // },
    // {
    //   tooltip: 'file',
    //   icon: <File />,
    //   onClick: () => {},
    // },
    {
      tooltip: 'create new board',
      icon: <PlusCircle className='path-slate-50 fill-slate-800' />,
      onClick: () => openMenu('add-board'),
    },
  ]

  const edit: Option[] = [
    {
      tooltip: 'move',
      icon: <ArrowLeftRight />,
      onClick: () => toast('moving cards has not been implemented yet'),
    },
    {
      tooltip: 'duplicate',
      icon: <Copy />,
      onClick: () => toast('duplicating cards has not been implemented yet'),
    },
    {
      tooltip: 'delete',
      icon: <Eraser />,
      onClick: async () => {
        if (!selected.length) return toast('no cards selected')

        deleteCards({ boardId, cards: selected })
        cancelEditing()
      },
    },
    {
      tooltip: 'share',
      icon: <Share />,
      onClick: () => toast('sharing cards has not been implemented yet'),
    },
  ]

  const options = isEditing ? edit : add

  return (
    <div className='flex flex-col gap-6 text-slate-800'>
      {options.map(({ tooltip, icon, onClick }) => (
        <Tooltip key={tooltip} label={tooltip}>
          <Button
            onClick={onClick}
            variant='ghost'
            size='icon'
            icon={icon}
            className='rounded-none py-1'
          />
        </Tooltip>
      ))}
    </div>
  )
}

export default SidebarOptions
