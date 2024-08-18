import { SessionProvider as Provider } from 'next-auth/react'
import type { ReactNode } from 'react'

import { auth } from '@/auth'

export const SessionProvider = async ({
  children,
}: {
  children: ReactNode
}) => {
  const session = await auth()
  return <Provider session={session}>{children}</Provider>
}
