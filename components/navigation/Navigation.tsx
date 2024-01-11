import Sidebar from '@/components/navigation/Sidebar'
import BottomNavigation from '@/components/navigation/BottomNavigation'

const Navigation = () => {
  return (
    <>
      <Sidebar className='hidden md:block' />
      <BottomNavigation className='md:hidden' />
    </>
  )
}

export default Navigation
