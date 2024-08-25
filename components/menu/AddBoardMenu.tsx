'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createBoard } from '@/actions/create-board'
import { useMenu } from '@/hooks/useMenu'
import { boardDetailsSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import { MenuWrapper } from './MenuWrapper'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'

export const AddBoardMenu = () => {
  const [data] = useMenu((state) => [state.data])

  const { mutate, isPending } = useMutation({
    mutationFn: createBoard,
    onError: (error) => toast(error.message),
    onMutate: () => reset(),
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

  return (
    <MenuWrapper type='add-board' position='center' closeButton className='p-4'>
      <h3 className='mb-4 text-lg font-bold'>create board</h3>
      <form
        onSubmit={handleSubmit((values) => {
          mutate({
            ...values,
            card: data.addBoard?.values,
            isFavorite: data.addBoard?.isFavorite,
          })
        })}
        className='flex flex-col gap-4'
      >
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
        <Button type='submit' disabled={isPending} loader={isPending}>
          {isPending ? 'creating board' : 'create board'}
        </Button>
      </form>
    </MenuWrapper>
  )
}
