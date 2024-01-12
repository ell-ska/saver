'use client'

import { Image as ImageIcon, Link, PlusCircle } from 'lucide-react'

import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'

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
    onClick: () => {},
  },
]

const SidebarAddMenu = () => {
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
