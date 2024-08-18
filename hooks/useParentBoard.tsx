import { useParams } from 'next/navigation'

import { useMenu } from '@/hooks/useMenu'
import type { PickBoardType, PickBoardValues } from '@/lib/types'

export const useParentBoard = (id?: string) => {
  const [openMenu] = useMenu((state) => [state.open])
  const { boardId } = useParams<{ boardId: string }>()

  const parentBoardId = id || boardId

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
