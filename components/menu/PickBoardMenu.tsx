'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { PlusCircle, Search, X } from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import { createCard } from '@/actions/create-card'
import { get } from '@/utils/get'
import { toast } from '@/utils/toast'
import { Button } from '@/components/ui/Button'
import { Preview } from '@/components/Preview'
import { MenuWrapper } from './MenuWrapper'
import { MenuAction } from './MenuAction'
import type { BoardsLatestUpdatedResponse } from '@/app/api/boards/latest-updated/route'

export const PickBoardMenu = () => {
  const [data, closeMenu, openMenu] = useMenu((state) => [
    state.data,
    state.close,
    state.open,
  ])

  const { data: boards } = useQuery<BoardsLatestUpdatedResponse>({
    queryKey: ['boards', 'latest-updated'],
    queryFn: () => get('/api/boards/latest-updated'),
  })

  const { mutate } = useMutation({
    mutationFn: createCard,
    onError: (error) => toast(error.message),
    onSuccess: closeMenu,
  })

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
          boards.length > 0 &&
          boards.slice(0, 2).map(({ id, title, cards }) => (
            <Preview
              key={id}
              title={title}
              previewCard={cards[0]}
              className='py-2 text-base'
              onClick={() => {
                if (!data.pickBoard) return toast('missing data')

                if (data.pickBoard.type === 'add') {
                  mutate({
                    parentBoardId: id,
                    ...data.pickBoard.values,
                  })
                }
              }}
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
