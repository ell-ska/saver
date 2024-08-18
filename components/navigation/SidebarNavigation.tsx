import { useSession } from 'next-auth/react'
import { CircleUserRound, Inbox } from 'lucide-react'

import { cn } from '@/utils/classnames'
import { Button } from '@/components/ui/Button'
export const SidebarNavigation = ({
  isCardBoardMenu,
}: {
  isCardBoardMenu: boolean
}) => {
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
    <nav
      className={cn('flex flex-col', isCardBoardMenu && 'items-center gap-2')}
    >
      {items.map(({ path, icon, text }) => {
        const Icon = icon
        return (
          <Button
            asLink
            key={path}
            href={path}
            variant='ghost'
            className={cn(
              'w-full justify-start gap-2 rounded-none px-4 py-1',
              isCardBoardMenu && 'justify-center',
            )}
          >
            <Icon size={isCardBoardMenu ? 24 : 20} className='shrink-0' />
            {!isCardBoardMenu && <span className='truncate'>{text}</span>}
          </Button>
        )
      })}
    </nav>
  )
}
