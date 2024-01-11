'use client'

import { useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'

import Button from '@/components/ui/Button'

type SocialProps = {
  type: 'log-in' | 'create-account'
}

const Social = ({ type }: SocialProps) => {
  const [isLoading, startTransition] = useTransition()

  const onClick = async () => {
    startTransition(async () => {
      // TODO: add callback url
      await signIn('github')
    })
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      loader={isLoading}
      variant='secondary'
      className='mb-4 w-full'
    >
      {isLoading
        ? 'redirecting to Github'
        : type === 'create-account'
          ? 'create an account with Github'
          : 'log in with Github'}{' '}
      <Github size={16} />
    </Button>
  )
}

export default Social
