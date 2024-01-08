import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { CircleUserRound, Inbox } from 'lucide-react'

import { cn } from '@/utils/classnames'
import { buttonVariants } from '@/components/ui/Button'

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
          <Link
            key={path}
            href={path}
            className={cn(
              buttonVariants({
                variant: 'ghost',
                className: 'justify-start gap-2 px-2 py-1',
              }),
            )}
          >
            <Icon size={20} className='shrink-0' />
            <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
              {text}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export default SidebarNavigation
