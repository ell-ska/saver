import type { ReactNode } from 'react'

import { getBoards } from '@/actions/get-boards'
import { Navigation } from '@/components/navigation/Navigation'
import { Header } from '@/components/Header'
import { MenuProvider } from '@/providers/MenuProvider'

export default async function HomeLayout({
  children,
}: {
  children: ReactNode
}) {
  const result = await getBoards([
    { title: 'all', previewImage: true },
    { title: 'favorites', previewImage: true },
    { title: 'where you left off', limit: 2, previewImage: true },
  ])
  const boards = result?.data

  return (
    <>
      <div className='flex h-svh overflow-hidden'>
        <Navigation boards={boards} />
        <div className='grow overflow-scroll'>
          <Header />
          <main className='relative flex min-h-[calc(100%-5rem)] flex-col px-4 pb-[4.5rem] pt-4 md:px-20 md:pb-4'>
            {children}
          </main>
        </div>
      </div>
      {/* FIXME: why is only this board passed? also should this really be a prop? */}
      <MenuProvider boards={boards?.['where you left off']} />
    </>
  )
}
