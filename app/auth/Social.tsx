'use client'

import Button from '@/components/ui/Button'
import { Github } from 'lucide-react'

const Social = () => {
  const onClick = () => {
    // TODO: log in / create account with github
  }

  return (
    <Button onClick={onClick} variant='secondary' className='mb-4 w-full'>
      create an account with Github <Github size={16} />
    </Button>
  )
}

export default Social
