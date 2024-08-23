'use client'

import { useMutation } from '@tanstack/react-query'

import { deleteBoard } from '@/actions/delete-board'
import { useMenu } from '@/hooks/useMenu'
import { toast } from '@/utils/toast'
import { MenuWrapper } from './MenuWrapper'
import { Button } from '@/components/ui/Button'

export const ConfirmMenu = () => {
  const [data, closeMenu] = useMenu((state) => [
    state.data.confirm,
    state.close,
  ])

  const { mutate, isPending } = useMutation({
    mutationFn: deleteBoard,
    onError: (error) => toast(error.message),
  })

  const onClick = () => {
    if (!data) return toast('missing data')

    if (data.type === 'delete-board') {
      mutate({ boardId: data.boardId })
    }
  }

  const title = data?.type === 'delete-board' ? 'delete board' : 'confirm'
  const loadingTitle =
    data?.type === 'delete-board' ? 'deleting board' : 'confirming'

  return (
    <MenuWrapper type='confirm' position='center' className='space-y-4 p-4'>
      <h4 className='text-center'>do you want to {title}?</h4>
      <div className='flex flex-col gap-4 md:flex-row'>
        <Button
          onClick={onClick}
          className='md:order-2 md:flex-1'
          disabled={isPending}
          loader={isPending}
        >
          {isPending ? loadingTitle : `yes, ${title}`}
        </Button>
        <Button onClick={closeMenu} variant='secondary' className='md:flex-1'>
          cancel
        </Button>
      </div>
    </MenuWrapper>
  )
}
