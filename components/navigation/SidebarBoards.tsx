import { Plus } from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import { cn } from '@/utils/classnames'
import { Preview } from '@/components/Preview'
import { Button } from '@/components/ui/Button'
import { Tooltip } from '@/components/ui/Tooltip'
import type { PreviewBoard } from '@/lib/types'

export const SidebarBoards = ({
  boards,
}: {
  boards: PreviewBoard[] | null
}) => {
  const [openMenu] = useMenu((state) => [state.open])

  const options = [
    {
      name: 'favorites',
      tooltip: 'create new favorite board',
      boards: boards?.filter((board) => board.isFavorite),
    },
    {
      name: 'boards',
      tooltip: 'create new board',
      boards: boards,
    },
  ]

  return (
    <div className='flex grow flex-col gap-8 overflow-hidden'>
      {options.map(
        ({ name, tooltip, boards }) =>
          boards &&
          boards.length > 0 && (
            <div
              key={name}
              className={cn(
                'group/board flex flex-col space-y-3',
                name !== 'favorites' && 'overflow-hidden',
              )}
            >
              <div className='flex items-center justify-between px-4'>
                <span>{name}</span>
                <Tooltip label={tooltip}>
                  <Button
                    onClick={() => {
                      if (name === 'favorites') {
                        openMenu('add-board', {
                          addBoard: { isFavorite: true },
                        })
                      } else {
                        openMenu('add-board')
                      }
                    }}
                    variant='ghost'
                    size='icon'
                    className='opacity-0 group-hover/board:opacity-100'
                    icon={<Plus size={16} />}
                  />
                </Tooltip>
              </div>
              <div className='grow overflow-y-scroll text-slate-800'>
                {boards.map(({ id, title, cards }) => (
                  <Preview
                    key={id}
                    asLink
                    href={`board/${id}`}
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
