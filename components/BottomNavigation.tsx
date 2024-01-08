import { CircleUserRound, Home, Inbox, Plus, Search } from 'lucide-react'

import Button from '@/components/ui/Button'

const BottomNavigation = () => {
  return (
    <nav className='absolute bottom-0 flex w-full items-center justify-between bg-white px-12 py-4'>
      <Button variant='ghost' size='icon'>
        <Home />
      </Button>
      <Button variant='ghost' size='icon'>
        <Search />
      </Button>
      <Button variant='ghost' size='icon'>
        <Plus />
      </Button>
      <Button variant='ghost' size='icon'>
        <Inbox />
      </Button>
      <Button variant='ghost' size='icon'>
        <CircleUserRound />
      </Button>
    </nav>
  )
}

export default BottomNavigation
