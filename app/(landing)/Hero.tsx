import { ChevronRight } from 'lucide-react'

import Button from '@/components/ui/Button'
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
      <Button asLink href='/auth/create-account'>
        <span>get saver for free!</span>
        <ChevronRight />
      </Button>
    </section>
  )
}

export default Hero
