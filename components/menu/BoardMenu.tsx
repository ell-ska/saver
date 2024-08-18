import { useParams } from 'next/navigation'
import { useAction } from 'next-safe-action/hooks'
import useSWR from 'swr'
import { Eraser, Settings2, Star } from 'lucide-react'

import { getIsFavoriteBoard } from '@/actions/get-is-favorite-board'
import { editFavoriteBoard } from '@/actions/edit-favorite-board'
import { useMenu } from '@/hooks/useMenu'
import { useEdit } from '@/hooks/useEdit'
import { cn } from '@/utils/classnames'
import { toast } from '@/utils/toast'
import { MenuWrapper } from './MenuWrapper'
import { MenuAction } from './MenuAction'

export const BoardMenu = () => {
  const [openMenu, closeMenu] = useMenu((state) => [state.open, state.close])
  const [startEditing] = useEdit((state) => [state.start])

  const { boardId } = useParams<{ boardId: string }>()

  const { data, mutate } = useSWR(`/is-favorite/${boardId}`, async () => {
    return (await getIsFavoriteBoard({ boardId })).data
  })

  const { execute: toggleFavorite } = useAction(editFavoriteBoard, {
    onError: ({ serverError }) => toast(serverError),
  })

  const options = [
    {
      icon: <Settings2 />,
      text: 'edit',
      onClick: () => {
        startEditing('board')
        closeMenu()
      },
    },
    {
      icon: <Star className={cn(data?.isFavorite && 'fill-primary')} />,
      text: data?.isFavorite ? 'remove from favorites' : 'add to favorites',
      onClick: () => {
        toggleFavorite({ boardId, isFavorite: !data?.isFavorite })
        closeMenu()
        mutate()
      },
    },
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
      onClick: () => {
        openMenu('confirm', { confirm: { type: 'delete-board', boardId } })
      },
    },
    // {
    //   icon: <Users />,
    //   text: 'collaborators',
    //   onClick: () => {},
    // },
    // {
    //   icon: <Share />,
    //   text: 'share',
    //   onClick: () => {},
    // },
  ]

  return (
    <MenuWrapper type='board' closeButton className='flex flex-col py-2'>
      {options.map((option) => (
        <MenuAction key={option.text} {...option} />
      ))}
    </MenuWrapper>
  )
}
