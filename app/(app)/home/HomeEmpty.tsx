'use client'

import { Plus } from 'lucide-react'

import { useAction } from '@/hooks/useAction'
import { createBoard } from '@/actions/create-board'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'

const HomeEmpty = () => {
  const { execute, isLoading } = useAction(createBoard, {
    onError: (error) => toast(error),
  })

  return (
    <div className='mt-8 flex grow flex-col items-center gap-6 md:-mt-20 md:justify-center'>
      <h3 className='text-center text-2xl font-bold'>
        you don&apos;t have any boards yet!
      </h3>
      <Button
        onClick={() => execute({})}
        disabled={isLoading}
        loader={isLoading}
        variant='secondary'
        className='w-full justify-between md:w-min'
        icon={<Plus size={20} />}
      >
        {isLoading ? 'creating board' : 'create new board'}
      </Button>
    </div>
  )
}

export default HomeEmpty
