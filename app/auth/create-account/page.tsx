import { GithubButton } from '../GithubButton'
import { CreateAccountForm } from '../CreateAccountForm'
import Button from '@/components/ui/Button'

export default function AuthCreateAccountPage() {
  return (
    <>
      <h1 className='mb-12 text-3xl md:mb-20 md:text-4xl'>
        welcome to <span className='font-branding text-primary'>saver</span>!
      </h1>
      <GithubButton>create an account with Github</GithubButton>
      <span className='mb-4'>or</span>
      <CreateAccountForm />
      <Button asLink href='/auth/log-in' variant='ghost' className='mt-8'>
        already have an account? <span className='font-bold'>log in</span>
      </Button>
    </>
  )
}
