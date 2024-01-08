import Link from 'next/link'
import { CircleUserRound, Home, Inbox, Plus, Search } from 'lucide-react'

import { cn } from '@/utils/classnames'
import Button, { buttonVariants } from '@/components/ui/Button'

const BottomNavigation = () => {
  return (
    <nav className='absolute bottom-0 flex w-full items-center justify-between bg-white px-12 py-4'>
      <Link
        href='/home'
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
      >
        <Home />
      </Link>
      <Link
        href='/search'
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
      >
        <Search />
      </Link>
      <Button variant='ghost' size='icon'>
        <Plus />
      </Button>
      <Link
        href='/sort-later'
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
      >
        <Inbox />
      </Link>
      <Link
        href='/profile'
        className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
      >
        <CircleUserRound />
      </Link>
    </nav>
  )
}

export default BottomNavigation
