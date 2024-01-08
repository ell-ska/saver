'use client'

import { signOut } from 'next-auth/react'

type HomePageProps = {
  params: {
    userId: string
  }
}

const HomePage = ({ params: { userId } }: HomePageProps) => {
  return (
    <div>
      home page: {userId}
      <button onClick={() => signOut()}>sign out</button>
    </div>
  )
}

export default HomePage
