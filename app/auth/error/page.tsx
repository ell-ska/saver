import Link from 'next/link'

const ErrorPage = () => {
  // TODO-t109: style this page
  return (
    <div>
      <div>an error occurred...</div>
      <Link href='/auth/log-in'>go back</Link>
    </div>
  )
}

export default ErrorPage
