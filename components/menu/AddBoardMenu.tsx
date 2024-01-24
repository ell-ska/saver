'use client'

import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createBoard } from '@/actions/create-board'
import { useMenu } from '@/hooks/useMenu'
import { boardDetailsSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import MenuWrapper from './MenuWrapper'

const AddBoardMenu = () => {
  const [data] = useMenu((state) => [state.data])

  const { execute: create, status } = useAction(createBoard, {
    onError: ({ serverError }) => toast(serverError),
    onExecute: () => reset(),
  })

  // after optimistic data has been implemented
  // TODO: fix loading stopping before redirecting

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof boardDetailsSchema>>({
    resolver: zodResolver(boardDetailsSchema),
  })

  const onSubmit = (values: z.infer<typeof boardDetailsSchema>) => {
    create({
      ...values,
      card: data.addBoard?.values,
      isFavorite: data.addBoard?.isFavorite,
    })
  }

  return (
    <MenuWrapper type='add-board' position='center' closeButton className='p-4'>
      <h3 className='mb-4 text-lg font-bold'>create board</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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
          {status === 'executing' ? 'creating board' : 'create board'}
        </Button>
      </form>
    </MenuWrapper>
  )
}

export default AddBoardMenu
