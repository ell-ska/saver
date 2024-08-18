import { getBoards } from '@/actions/get-boards'
import MenuProvider from '@/providers/MenuProvider'
import Navigation from '@/components/navigation/Navigation'
import Header from '@/components/Header'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: boards } = await getBoards([
    { title: 'all', previewImage: true },
    { title: 'favorites', previewImage: true },
    { title: 'where you left off', limit: 2, previewImage: true },
  ])

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
      <MenuProvider boards={boards?.['where you left off']} />
    </>
  )
}
