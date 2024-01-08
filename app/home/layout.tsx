import Navigation from '@/components/Navigation'

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex grow'>
      <Navigation />
      <div>
        <header>header</header>
        <main>{children}</main>
      </div>
    </div>
  )
}

export default HomeLayout
