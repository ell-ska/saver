import Navigation from '@/components/Navigation'
import Header from '@/components/Header'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-svh overflow-hidden'>
      <Navigation />
      <div className='grow overflow-scroll'>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}

export default HomeLayout
