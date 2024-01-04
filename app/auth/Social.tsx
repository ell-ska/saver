'use client'

import Button from '@/components/ui/Button'
import { Github } from 'lucide-react'

type SocialProps = {
  type: 'log-in' | 'create-account'
}

const Social = ({ type }: SocialProps) => {
  const onClick = () => {
    // TODO: log in / create account with github
  }

  return (
    <Button onClick={onClick} variant='secondary' className='mb-4 w-full'>
      {type === 'create-account'
        ? 'create an account with Github'
        : 'log in with Github'}{' '}
      <Github size={16} />
    </Button>
  )
}

export default Social
