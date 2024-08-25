import { useParams } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Eraser, Settings2, Star } from 'lucide-react'

import { editFavoriteBoard } from '@/actions/edit-favorite-board'
import { useMenu } from '@/hooks/useMenu'
import { useEdit } from '@/hooks/useEdit'
import { get } from '@/utils/get'
import { cn } from '@/utils/classnames'
import { toast } from '@/utils/toast'
import { MenuWrapper } from './MenuWrapper'
import { MenuAction } from './MenuAction'
import type { BoardIsFavoriteResponse } from '@/app/api/board/is-favorite/[id]/route'

export const BoardMenu = () => {
  const [openMenu, closeMenu] = useMenu((state) => [state.open, state.close])
  const [startEditing] = useEdit((state) => [state.start])

  const { boardId } = useParams<{ boardId: string }>()

  const queryClient = useQueryClient()
  const queryKey = ['board', 'is-favorite', boardId]

  const { data } = useQuery<BoardIsFavoriteResponse>({
    queryKey,
    queryFn: () => get(`/api/board/is-favorite/${boardId}`),
    enabled: () => boardId !== undefined,
  })

  const { mutate } = useMutation({
    mutationFn: editFavoriteBoard,
    onMutate: async (updatedBoard) => {
      await queryClient.cancelQueries({ queryKey })

      const board = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, updatedBoard)

      return { board, updatedBoard }
    },
    onError: (error, _, context) => {
      toast(error.message)
      queryClient.setQueryData(queryKey, context?.board)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
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
        mutate({ boardId, isFavorite: !data?.isFavorite })
        closeMenu()
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
