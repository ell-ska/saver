import { Sidebar } from '@/components/navigation/Sidebar'
import { BottomNavigation } from '@/components/navigation/BottomNavigation'
import type { SimpleBoardsWithKeys } from '@/lib/types'

export const Navigation = ({
  boards,
}: {
  boards: SimpleBoardsWithKeys | undefined
}) => {
  return (
    <>
      <Sidebar className='hidden md:block' boards={boards} />
      <BottomNavigation className='md:hidden' />
    </>
  )
}
