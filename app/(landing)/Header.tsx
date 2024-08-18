import Link from 'next/link'

import Button from '@/components/ui/Button'

export const Header = () => {
  return (
    <header className='fixed flex w-full items-center justify-between bg-white px-6 py-4'>
      <Link href='/'>
        <h3 className='font-branding text-2xl text-primary'>saver</h3>
      </Link>
      <div className='space-x-4'>
        <Button asLink href='/auth/log-in' variant='secondary'>
          log in
        </Button>
        <Button asLink href='/auth/create-account'>
          get saver
        </Button>
      </div>
    </header>
  )
}
