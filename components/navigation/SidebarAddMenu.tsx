'use client'

import { Image as ImageIcon, Link, PlusCircle } from 'lucide-react'

import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import { useAction } from '@/hooks/useAction'
import { createBoard } from '@/actions/create-board'
import { toast } from '@/utils/toast'

const SidebarAddMenu = () => {
  // TODO: fix loading state
  const { execute } = useAction(createBoard, {
    onError: (error) => toast(error),
  })

  const options = [
    {
      tooltip: 'link',
      icon: <Link />,
      onClick: () => {},
    },
    {
      tooltip: 'image', // or video
      icon: <ImageIcon />,
      onClick: () => {},
    },
    // TODO: add when implemented
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
      onClick: () => execute(),
    },
  ]

  return (
    <div className='flex flex-col gap-6 text-slate-800'>
      {options.map(({ tooltip, icon, onClick }) => (
        <Tooltip key={tooltip} label={tooltip}>
          <Button
            onClick={onClick}
            variant='ghost'
            size='icon'
            icon={icon}
            className='py-1'
          />
        </Tooltip>
      ))}
    </div>
  )
}

export default SidebarAddMenu
