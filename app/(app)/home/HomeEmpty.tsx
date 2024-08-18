'use client'

import { Plus } from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import { Button } from '@/components/ui/Button'

export const HomeEmpty = () => {
  const [openMenu] = useMenu((state) => [state.open])

  return (
    <div className='mt-8 flex grow flex-col items-center gap-6 md:-mt-20 md:justify-center'>
      <h3 className='text-center text-2xl font-bold'>
        you don&apos;t have any boards yet!
      </h3>
      <Button
        onClick={() => openMenu('add-board')}
        variant='secondary'
        className='w-full justify-between md:w-min'
        icon={<Plus size={20} />}
      >
        create new board
      </Button>
    </div>
  )
}
