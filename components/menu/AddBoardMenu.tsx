'use client'

import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createBoard } from '@/actions/create-board'
import { boardDetailsSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import MenuWrapper from './MenuWrapper'

const AddBoardMenu = () => {
  const { execute, status } = useAction(createBoard, {
    onError: ({ serverError }) => toast(serverError),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof boardDetailsSchema>>({
    resolver: zodResolver(boardDetailsSchema),
  })

  return (
    <MenuWrapper type='add-board' position='center' closeButton className='p-4'>
      <h3 className='mb-4 text-lg font-bold'>create board</h3>
      <form onSubmit={handleSubmit(execute)} className='flex flex-col gap-4'>
        <FormField
          {...register('title')}
          error={errors.title}
          type='text'
          labelText='title'
        />
        <FormField
          {...register('description')}
          error={errors.description}
          type='text'
          labelText='description (optional)'
        />
        <Button
          type='submit'
          disabled={status === 'executing'}
          loader={status === 'executing'}
        >
          create board
        </Button>
      </form>
    </MenuWrapper>
  )
}

export default AddBoardMenu
