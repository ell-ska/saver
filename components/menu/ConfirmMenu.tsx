'use client'

import { useAction } from 'next-safe-action/hooks'

import { deleteBoard } from '@/actions/delete-board'
import { useMenu } from '@/hooks/useMenu'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'
import MenuWrapper from './MenuWrapper'

const ConfirmMenu = () => {
  const [data, closeMenu] = useMenu((state) => [
    state.data.confirm,
    state.close,
  ])

  const { execute, status } = useAction(deleteBoard, {
    onError: ({ serverError }) => toast(serverError),
    onSuccess: closeMenu,
  })

  const onClick = () => {
    if (!data) return toast('missing data')

    if (data.type === 'delete-board') {
      execute({ boardId: data.boardId })
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
          disabled={status === 'executing'}
          loader={status === 'executing'}
        >
          {status === 'executing' ? loadingTitle : `yes, ${title}`}
        </Button>
        <Button onClick={closeMenu} variant='secondary' className='md:flex-1'>
          cancel
        </Button>
      </div>
    </MenuWrapper>
  )
}

export default ConfirmMenu
