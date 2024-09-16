'use client'

import { type ReactNode, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export const GithubButton = ({ children }: { children: ReactNode }) => {
  const callbackUrl = useSearchParams().get('callback') || undefined
  const [isLoading, startTransition] = useTransition()

  const onClick = async () => {
    startTransition(async () => {
      await signIn('github', {
        callbackUrl,
      })
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
