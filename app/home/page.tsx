'use client'

import { Plus } from 'lucide-react'

import Button from '@/components/ui/Button'

const HomePage = () => {
  return (
    <div className='mt-8 flex flex-col items-center gap-6 md:-mt-20 md:place-self-center'>
      <h3 className='text-2xl font-bold'>
        you don&apos;t have any boards yet!
      </h3>
      <Button variant='secondary' className='w-full justify-between md:w-min'>
        create new board <Plus size={20} />
      </Button>
    </div>
  )
}

export default HomePage
