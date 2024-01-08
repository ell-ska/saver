import Sidebar from '@/components/Sidebar'
import BottomNavigation from '@/components/BottomNavigation'

const Navigation = () => {
  return (
    <>
      <Sidebar className='hidden md:block' />
      <BottomNavigation className='md:hidden' />
    </>
  )
}

export default Navigation
