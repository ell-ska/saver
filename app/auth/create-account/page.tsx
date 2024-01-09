import Button from '@/components/ui/Button'
import Social from '../Social'
import CreateAccountForm from '../CreateAccountForm'

const CreateAccountPage = () => {
  return (
    <>
      <h1 className='mb-12 text-3xl md:mb-20 md:text-4xl'>
        welcome to <span className='font-branding text-primary'>saver</span>!
      </h1>
      <Social type='create-account' />
      <span className='mb-4'>or</span>
      <CreateAccountForm />
      <Button asLink href='/auth/log-in' variant='ghost' className='mt-8'>
        already have an account? <span className='font-bold'>log in</span>
      </Button>
    </>
  )
}

export default CreateAccountPage
