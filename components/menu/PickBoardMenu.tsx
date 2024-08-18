'use client'

import { useAction } from 'next-safe-action/hooks'
import { PlusCircle, Search, X } from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import { createCard } from '@/actions/create-card'
import { SimpleBoard } from '@/lib/types'
import { toast } from '@/utils/toast'
import { Button } from '@/components/ui/Button'
import { Preview } from '@/components/Preview'
import { MenuWrapper } from './MenuWrapper'
import { MenuAction } from './MenuAction'

export const PickBoardMenu = ({
  boards,
}: {
  boards: SimpleBoard[] | undefined
}) => {
  const [data, closeMenu, openMenu] = useMenu((state) => [
    state.data,
    state.close,
    state.open,
  ])

  const { execute: create } = useAction(createCard, {
    onError: ({ serverError }) => toast(serverError),
    onSuccess: closeMenu,
  })

  const onClick = async (id: string) => {
    if (!data.pickBoard) return toast('missing data')

    if (data.pickBoard.type === 'add') {
      create({
        parentBoardId: id,
        ...data.pickBoard.values,
      })
    }
  }

  return (
    <MenuWrapper type='pick-board' position='center' className='py-2'>
      <div className='flex items-center justify-between px-4 py-2 text-slate-300'>
        {/* TODO: add search functionality */}
        <Button variant='ghost' className='p-0'>
          <Search />
        </Button>
        <span className='text-sm'>{data.pickBoard?.type} to</span>
        <Button variant='ghost' className='p-0' onClick={closeMenu}>
          <X />
        </Button>
      </div>
      <div>
        {/* <MenuAction
          text='sort later'
          icon={<Inbox />}
          onClick={() => {
            // TODO: add to sort later board
          }}
        /> */}
        {boards &&
          boards
            .slice(0, 2)
            .map(({ id, title, cards }) => (
              <Preview
                key={id}
                title={title}
                previewCard={cards[0]}
                className='py-2 text-base'
                onClick={() => onClick(id)}
              />
            ))}
        <MenuAction
          text='create new board'
          icon={<PlusCircle className='path-white fill-primary' />}
          onClick={() => {
            if (!data.pickBoard) return toast('missing data')

            openMenu('add-board', {
              addBoard: { values: data.pickBoard.values },
            })
          }}
        />
      </div>
    </MenuWrapper>
  )
}
