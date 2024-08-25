import type { ReactNode } from 'react'

import { db } from '@/lib/db'
import { authenticatedQuery } from '@/lib/access-control-queries'
import { MenuProvider } from '@/providers/MenuProvider'
import { Navigation } from '@/components/navigation/Navigation'
import { Header } from '@/components/Header'

export default async function HomeLayout({
  children,
}: {
  children: ReactNode
}) {
  const allBoards = await authenticatedQuery((userId) =>
    db.board.findMany({
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        title: true,
        isFavorite: true,
        cards: {
          orderBy: { createdAt: 'desc' },
          where: {
            OR: [
              { image: { isNot: null } },
              { link: { image: { isNot: null } } },
            ],
          },
          include: { image: true, link: { include: { image: true } } },
          take: 1,
        },
        _count: true,
      },
    }),
  )

  // const result = await getBoards([
  //   { title: 'all', previewImage: true },
  //   { title: 'favorites', previewImage: true },
  //   { title: 'where you left off', limit: 2, previewImage: true },
  // ])
  // const boards = result?.data

  return (
    <>
      <div className='flex h-svh overflow-hidden'>
        <Navigation boards={allBoards} />
        <div className='grow overflow-scroll'>
          <Header />
          <main className='relative flex min-h-[calc(100%-5rem)] flex-col px-4 pb-[4.5rem] pt-4 md:px-20 md:pb-4'>
            {children}
          </main>
        </div>
      </div>
      <MenuProvider />
    </>
  )
}
