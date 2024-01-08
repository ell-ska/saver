import { SessionProvider as Provider } from 'next-auth/react'

import { auth } from '@/auth'

type SessionProviderProps = {
  children: React.ReactNode
}

const SessionProvider = async ({ children }: SessionProviderProps) => {
  const session = await auth()
  return <Provider session={session}>{children}</Provider>
}

export default SessionProvider
