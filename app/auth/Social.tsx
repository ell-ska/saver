'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'

import { defaultLoginRedirect } from '@/routes'
import Button from '@/components/ui/Button'

type SocialProps = {
  type: 'log-in' | 'create-account'
}

const Social = ({ type }: SocialProps) => {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    setIsLoading(true)
    await signIn('github', {
      redirect: true,
      redirectTo: searchParams.get('callbackUrl') || defaultLoginRedirect,
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
