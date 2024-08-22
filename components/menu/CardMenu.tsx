'use client'

import { useParams } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import { Eraser, Settings2 } from 'lucide-react'

import { deleteCard } from '@/actions/delete-card'
import { toast } from '@/utils/toast'
import { MenuWrapper } from './MenuWrapper'
import { MenuAction } from './MenuAction'

export const CardMenu = () => {
  const { execute: executeDelete, status: deleteStatus } = useAction(
    deleteCard,
    {
      onError: ({ error: { serverError } }) => toast(serverError),
    },
  )

  const { cardId } = useParams<{ cardId: string }>()

  const options = [
    {
      icon: <Settings2 />,
      text: 'edit',
      onClick: () => {},
    },
    // {
    //   icon: <Maximize />,
    //   text: 'make full width', // make half width
    //   onClick: () => {},
    // },
    // {
    //   icon: <ArrowLeftRight />,
    //   text: 'move',
    //   onClick: () => {},
    // },
    // {
    //   icon: <Copy />,
    //   text: 'duplicate',
    //   onClick: () => {},
    // },
    {
      icon: <Eraser />,
      text: 'delete',
      onClick: () => executeDelete({ cardId }),
    },
    // {
    //   icon: <MessageCircle />,
    //   text: 'comment',
    //   onClick: () => {},
    // },
    // {
    //   icon: <Share />,
    //   text: 'share',
    //   onClick: () => {},
    // },
  ]

  return (
    <MenuWrapper type='card' closeButton className='flex flex-col py-2'>
      {options.map((option) => (
        <MenuAction
          key={option.text}
          {...option}
          isLoading={deleteStatus === 'executing' && option.text === 'delete'}
        />
      ))}
    </MenuWrapper>
  )
}
