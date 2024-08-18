'use client'

import { ReactNode, useTransition } from 'react'
import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'

import Button from '@/components/ui/Button'

export const GithubButton = ({ children }: { children: ReactNode }) => {
  const [isLoading, startTransition] = useTransition()

  const onClick = async () => {
    startTransition(async () => {
      // TODO-t98: add callback url
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
      icon={<Github size={16} />}
    >
      {isLoading ? 'redirecting to Github' : children}
    </Button>
  )
}
