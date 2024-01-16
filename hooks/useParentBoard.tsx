import { useParams } from 'next/navigation'

import { useMenu } from '@/hooks/useMenu'
import { PickBoardType, PickBoardValues } from '@/lib/types'

export const useParentBoard = (id?: string) => {
  const [openMenu] = useMenu((state) => [state.open])
  const params = useParams()

  const parentBoardId = typeof params.boardId === 'string' ? params.boardId : id

  const redirectToPickBoard = (
    redirectTo: PickBoardType,
    values: PickBoardValues,
  ) => {
    openMenu('pick-board', {
      pickBoard: { type: redirectTo, values },
    })
  }

  return {
    parentBoardId,
    redirectToPickBoard,
  }
}
