import { Sidebar } from '@/components/navigation/Sidebar'
import { BottomNavigation } from '@/components/navigation/BottomNavigation'
import type { PreviewBoard } from '@/lib/types'

export const Navigation = ({ boards }: { boards: PreviewBoard[] | null }) => {
  return (
    <>
      <Sidebar className='hidden md:block' boards={boards} />
      <BottomNavigation className='md:hidden' />
    </>
  )
}
