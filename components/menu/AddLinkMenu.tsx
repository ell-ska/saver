'use client'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createCard } from '@/actions/create-card'
import { useMenu } from '@/hooks/useMenu'
import { useParentBoard } from '@/hooks/useParentBoard'
import { createLinkCardSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import { MenuWrapper } from './MenuWrapper'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'

const schema = createLinkCardSchema.omit({
  parentBoardId: true,
})

export const AddLinkMenu = () => {
  const [closeMenu] = useMenu((state) => [state.close])
  const { parentBoardId, redirectToPickBoard } = useParentBoard()

  // TODO: optimistic update
  const { mutate, isPending } = useMutation({
    mutationFn: createCard,
    onError: (error) => toast(error.message),
    onSuccess: () => {
      closeMenu()
      reset()
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'LINK',
    },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!parentBoardId) return redirectToPickBoard('add', values)

    mutate({
      ...values,
      parentBoardId,
    })
  }

  return (
    <MenuWrapper type='add-link' position='center' closeButton className='p-4'>
      <h3 className='mb-4 text-lg font-bold'>add link</h3>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <FormField
          {...register('url')}
          error={errors.url}
          type='url'
          labelText='paste link'
        />
        <Button type='submit' disabled={isPending} loader={isPending}>
          {isPending ? 'adding link' : 'add link'}
        </Button>
      </form>
    </MenuWrapper>
  )
}
