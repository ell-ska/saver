'use client'

import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useMenu } from '@/hooks/useMenu'
import { useParentBoard } from '@/hooks/useParentBoard'
import { createCard } from '@/actions/create-card'
import { createLinkCardSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import MenuWrapper from './MenuWrapper'

const schema = createLinkCardSchema.omit({
  parentBoardId: true,
})

const AddLinkMenu = () => {
  const [closeMenu] = useMenu((state) => [state.close])
  const { parentBoardId, redirectToPickBoard } = useParentBoard()

  // TODO: optimistic update
  const { execute, status } = useAction(createCard, {
    onError: ({ serverError }) => toast(serverError),
    onSuccess: closeMenu,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'LINK',
    },
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    if (!parentBoardId) return redirectToPickBoard('add', values)

    execute({
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
        <Button
          type='submit'
          disabled={status === 'executing'}
          loader={status === 'executing'}
        >
          {status === 'executing' ? 'adding link' : 'add link'}
        </Button>
      </form>
    </MenuWrapper>
  )
}

export default AddLinkMenu
