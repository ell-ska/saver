'use client'

import { useAction } from 'next-safe-action/hooks'
import { PlusCircle, Search, X } from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import { createCard } from '@/actions/create-card'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'
import MenuWrapper from './MenuWrapper'
import MenuAction from './MenuAction'

const PickBoardMenu = () => {
  const [data, closeMenu] = useMenu((state) => [state.data, state.close])

  const { execute: create } = useAction(createCard, {
    onError: ({ serverError }) => toast(serverError),
    onSuccess: closeMenu,
  })

  const onClick = async () => {
    if (!data.pickBoard) return toast('missing data')

    if (data.pickBoard.type === 'add') {
      create({
        parentBoardId: 'clr8yb9eq0003rv58x60wjx71',
        ...data.pickBoard.values,
      })
    }
  }

  return (
    <MenuWrapper type='pick-board' position='center' className='pb-2 pt-4'>
      <div className='flex items-center justify-between px-4 text-slate-300'>
        {/* TODO: add search functionality */}
        <Button variant='ghost' className='p-0'>
          <Search />
        </Button>
        <span className='text-sm'>{data.pickBoard?.type} to</span>
        <Button variant='ghost' className='p-0' onClick={closeMenu}>
          <X />
        </Button>
      </div>
      <div className='px-4 pb-2 pt-4'>
        {/* TODO-t114: add boards to choose from */}
        <button onClick={onClick}>add to clr8yb9eq0003rv58x60wjx71</button>
      </div>
      <MenuAction
        text='create new board'
        icon={<PlusCircle className='path-white fill-primary' />}
        onClick={() => {
          // TODO-t114: open create board menu with data
        }}
      />
    </MenuWrapper>
  )
}

export default PickBoardMenu
