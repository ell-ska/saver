import { useSession } from 'next-auth/react'
import { CircleUserRound, Inbox } from 'lucide-react'

import Button from '@/components/ui/Button'

const SidebarNavigation = () => {
  const user = useSession().data?.user

  const items = [
    {
      path: '/sort-later',
      icon: Inbox,
      text: 'sort later',
    },
    {
      path: '/profile',
      icon: CircleUserRound,
      text: user?.name,
    },
  ]

  return (
    <nav className='flex flex-col'>
      {items.map(({ path, icon, text }) => {
        const Icon = icon
        return (
          <Button
            asLink
            key={path}
            href={path}
            variant='ghost'
            className='justify-start gap-2 py-1'
          >
            <Icon size={20} className='shrink-0' />
            <span className='truncate'>{text}</span>
          </Button>
        )
      })}
    </nav>
  )
}

export default SidebarNavigation
