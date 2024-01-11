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
      <Button asLink href='/home' variant='ghost' size='icon' icon={<Home />} />
      <Button
        asLink
        href='/search'
        variant='ghost'
        size='icon'
        icon={<Search />}
      />
      <Button variant='ghost' size='icon' icon={<Plus />} />
      <Button
        asLink
        href='/sort-later'
        variant='ghost'
        size='icon'
        icon={<Inbox />}
      />
      <Button
        asLink
        href='/profile'
        variant='ghost'
        size='icon'
        icon={<CircleUserRound />}
      />
    </nav>
  )
}

export default BottomNavigation
