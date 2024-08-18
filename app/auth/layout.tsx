import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className='flex w-full max-w-sm grow flex-col items-center self-center px-6 pb-4 pt-16 smh:pt-28'>
      {children}
    </main>
  )
}
