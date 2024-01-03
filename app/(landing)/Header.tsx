import Link from 'next/link'

import { cn } from '@/utils/classnames'
import { buttonVariants } from '@/components/ui/Button'

const Header = () => {
  return (
    <header className='fixed flex w-full items-center justify-between bg-white px-6 py-4'>
      <Link href='/'>
        <h3 className='font-branding text-primary text-2xl'>saver</h3>
      </Link>
      <div className='space-x-4'>
        <Link
          href='/auth/log-in'
          className={cn(buttonVariants({ variant: 'secondary' }))}
        >
          log in
        </Link>
        <Link href='/auth/create-account' className={buttonVariants()}>
          get saver
        </Link>
      </div>
    </header>
  )
}

export default Header
