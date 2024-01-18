import { Plus } from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import { SimpleBoardsWithKeys } from '@/lib/types'
import Button from '@/components/ui/Button'
import Tooltip from '@/components/ui/Tooltip'
import Preview from '@/components/Preview'

type BoardNavigationProps = {
  boards: SimpleBoardsWithKeys
}

const BoardNavigation = ({ boards }: BoardNavigationProps) => {
  const [openMenu] = useMenu((state) => [state.open])

  const options = [
    {
      name: 'favorites',
      tooltip: 'create new favorite board',
      boards: boards.favorites,
    },
    {
      name: 'boards',
      tooltip: 'create new board',
      boards: boards.all,
    },
  ]

  return (
    <div className='space-y-12'>
      {options.map(
        ({ name, tooltip, boards }) =>
          boards.length > 0 && (
            <div key={name} className='group/board space-y-3'>
              <div className='flex items-center justify-between px-4'>
                <span>{name}</span>
                <Tooltip label={tooltip}>
                  <Button
                    onClick={() => openMenu('add-board')}
                    variant='ghost'
                    size='icon'
                    className='opacity-0 group-hover/board:opacity-100'
                    icon={<Plus size={16} />}
                  />
                </Tooltip>
              </div>
              <div className='text-slate-800'>
                {boards.map(({ id, title, cards }) => (
                  <Preview
                    key={id}
                    id={id}
                    type='board'
                    title={title}
                    previewCard={cards?.[0]}
                  />
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  )
}

export default BoardNavigation
