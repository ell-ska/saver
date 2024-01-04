const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex w-full max-w-sm grow flex-col items-center self-center px-6 pb-4 pt-20'>
      {children}
    </main>
  )
}

export default AuthLayout
