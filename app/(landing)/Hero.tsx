import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/utils/classnames'

const Hero = () => {
  return (
    <section className='flex h-screen flex-col items-center justify-center gap-6 bg-white'>
      <h1 className='flex flex-col items-center text-center text-4xl'>
        <span>
          you like <span className='underline'>making lists</span>?
        </span>
        <span>
          welcome to <span className='font-branding text-5xl'>saver</span>
        </span>
      </h1>
      <Link href='/auth/create-account' className={cn(buttonVariants())}>
        <span>get saver for free!</span>
        <ChevronRight />
      </Link>
    </section>
  )
}

export default Hero
