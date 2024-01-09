import { CircleUserRound, Home, Inbox, Plus, Search } from 'lucide-react'

import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'

type BottomNavigationProps = { className: string }

const BottomNavigation = ({ className }: BottomNavigationProps) => {
  return (
    <nav
      className={cn(
        'absolute bottom-0 flex w-full items-center justify-between bg-white px-12 py-4',
        className,
      )}
    >
      <Button asLink href='/home' variant='ghost' size='icon'>
        <Home />
      </Button>
      <Button asLink href='/search' variant='ghost' size='icon'>
        <Search />
      </Button>
      <Button variant='ghost' size='icon'>
        <Plus />
      </Button>
      <Button asLink href='/sort-later' variant='ghost' size='icon'>
        <Inbox />
      </Button>
      <Button asLink href='/profile' variant='ghost' size='icon'>
        <CircleUserRound />
      </Button>
    </nav>
  )
}

export default BottomNavigation
