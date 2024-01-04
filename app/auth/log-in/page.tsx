import Link from 'next/link'

import { cn } from '@/utils/classnames'
import { buttonVariants } from '@/components/ui/Button'
import Social from '../Social'
import LogInForm from '../LogInForm'

const LogInPage = () => {
  return (
    <>
      <div className='text-center'>
        <h2 className='font-branding text-2xl text-primary'>saver</h2>
        <h1 className='mb-12 text-3xl md:mb-20 md:text-4xl'>welcome back!</h1>
      </div>
      <Social type='log-in' />
      <span className='mb-4'>or</span>
      <LogInForm />
      <Link
        href='/auth/create-account'
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm', className: 'mt-8' }),
        )}
      >
        don&apos;t have an account?{' '}
        <span className='font-bold'>create one</span>
      </Link>
    </>
  )
}

export default LogInPage
