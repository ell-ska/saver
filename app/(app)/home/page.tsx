'use client'

import { signOut } from 'next-auth/react'
import HomeEmpty from './HomeEmpty'

const HomePage = () => {
  return (
    <>
      <HomeEmpty />
      <button onClick={() => signOut()}>log out</button>
    </>
  )
}

export default HomePage
