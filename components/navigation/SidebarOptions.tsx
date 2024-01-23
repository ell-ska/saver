'use client'

import {
  ArrowLeftRight,
  Copy,
  Eraser,
  Image as ImageIcon,
  Link,
  PlusCircle,
  Share,
} from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'

type Option = { tooltip: string; icon: React.ReactNode; onClick: () => void }

const SidebarOptions = () => {
  const [openMenu] = useMenu((state) => [state.open])

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

  // switch to these on isEditing
  const edit: Option[] = [
    { tooltip: 'move', icon: <ArrowLeftRight />, onClick: () => {} },
    { tooltip: 'duplicate', icon: <Copy />, onClick: () => {} },
    { tooltip: 'delete', icon: <Eraser />, onClick: () => {} },
    { tooltip: 'share', icon: <Share />, onClick: () => {} },
  ]

  return (
    <div className='flex flex-col gap-6 text-slate-800'>
      {add.map(({ tooltip, icon, onClick }) => (
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
