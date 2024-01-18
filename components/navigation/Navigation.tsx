import { SimpleBoardsWithKeys } from '@/lib/types'
import Sidebar from '@/components/navigation/Sidebar'
import BottomNavigation from '@/components/navigation/BottomNavigation'

type NavigationProps = {
  boards: SimpleBoardsWithKeys | undefined
}

const Navigation = ({ boards }: NavigationProps) => {
  return (
    <>
      <Sidebar className='hidden md:block' boards={boards} />
      <BottomNavigation className='md:hidden' />
    </>
  )
}

export default Navigation
