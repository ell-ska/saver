import Navigation from '@/components/Navigation'
import Header from '@/components/Header'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-svh overflow-hidden'>
      <Navigation />
      <div className='grow overflow-scroll'>
        <Header />
        <main className='grid h-[calc(100%-5rem)] px-4 py-4 md:px-20'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default HomeLayout
