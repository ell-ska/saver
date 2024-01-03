import Image from 'next/image'

import { cn } from '@/utils/classnames'
import image1 from '@/public/saver-1.png'
import image2 from '@/public/saver-2.png'
import image3 from '@/public/saver-3.png'

const images = [
  { data: image1, alt: 'saver collaborative board' },
  { data: image2, alt: 'saver home page' },
  { data: image3, alt: 'saver search view' },
]

const Showcase = () => {
  return (
    <section className='mt-[-25vh] flex max-w-5xl flex-col gap-12 sm:flex-row sm:gap-8 lg:gap-16'>
      {images.map((image, index) => (
        <Image
          key={image.data.src}
          src={image.data}
          alt={image.alt}
          className={cn(
            'max-h-screen min-w-0 object-contain transition hover:scale-[1.02]',
            index === 1 && 'sm:order-first',
          )}
        />
      ))}
    </section>
  )
}

export default Showcase
