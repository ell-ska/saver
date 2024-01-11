'use client'

import { useTransition } from 'react'
import { Plus } from 'lucide-react'

import { createBoard } from '@/actions/create-board'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'

const HomeEmpty = () => {
  const [isLoading, startTransition] = useTransition()

  const onClick = async () => {
    startTransition(async () => {
      try {
        const data = await createBoard()
        if (data?.error) toast(data.error)
      } catch (error) {
        toast('something went wrong')
      }
    })
  }

  return (
    <div className='mt-8 flex flex-col items-center gap-6 md:-mt-20 md:place-self-center'>
      <h3 className='text-center text-2xl font-bold'>
        you don&apos;t have any boards yet!
      </h3>
      <Button
        disabled={isLoading}
        loader={isLoading}
        onClick={onClick}
        variant='secondary'
        className='w-full justify-between md:w-min'
      >
        create new board <Plus size={20} />
      </Button>
    </div>
  )
}

export default HomeEmpty
