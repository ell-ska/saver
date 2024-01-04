import Link from 'next/link'

import { cn } from '@/utils/classnames'
import { buttonVariants } from '@/components/ui/Button'
import Social from '../Social'
import CreateAccountForm from '../CreateAccountForm'

const CreateAccountPage = () => {
  return (
    <>
      <h1 className='mb-12 text-3xl md:mb-20 md:text-4xl'>
        welcome to <span className='font-branding text-primary'>saver</span>!
      </h1>
      <Social />
      <span className='mb-4'>or</span>
      <CreateAccountForm />
      <Link
        href='/auth/log-in'
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'sm', className: 'mt-8' }),
        )}
      >
        already have an account? <span className='font-bold'>log in</span>
      </Link>
    </>
  )
}

export default CreateAccountPage
