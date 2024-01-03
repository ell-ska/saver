import { Outfit, Kalam } from 'next/font/google'
import type { Metadata } from 'next'

import { cn } from '@/utils/classnames'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-primary',
})

const kalam = Kalam({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-branding',
})

export const metadata: Metadata = {
  title: 'Saver',
  description: 'Organize your online presence',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon-dark.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon-light.svg',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          outfit.variable,
          kalam.variable,
          'font-primary text-slate-800',
        )}
      >
        {children}
      </body>
    </html>
  )
}
