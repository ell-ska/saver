import MenuProvider from '@/providers/MenuProvider'
import Navigation from '@/components/navigation/Navigation'
import Header from '@/components/Header'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='flex h-svh overflow-hidden'>
        <Navigation />
        <div className='grow overflow-scroll'>
          <Header />
          <main className='relative flex min-h-[calc(100%-5rem)] flex-col px-4 py-4 md:px-20'>
            {children}
          </main>
        </div>
      </div>
      <MenuProvider />
    </>
  )
}

export default HomeLayout
