'use client'

import { signOut } from 'next-auth/react'
import Button from '@/components/ui/Button'

const ProfilePage = () => {
  return (
    <Button onClick={() => signOut()} className='w-min'>
      log out
    </Button>
  )
}

export default ProfilePage
