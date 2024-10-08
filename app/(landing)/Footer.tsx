import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className='flex items-center justify-between px-6 py-4'>
      <Link href='/'>privacy policy</Link>
      <Link href='/'>terms & conditions</Link>
    </footer>
  )
}
