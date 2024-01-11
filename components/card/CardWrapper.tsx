import Link from 'next/link'
import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/utils/classnames'

const cardVariants = cva('border border-slate-200 overflow-hidden', {
  variants: {
    rounded: { sm: 'rounded-sm', lg: 'rounded-lg' },
    width: { half: 'col-span-1', full: 'col-span-2' },
  },
  defaultVariants: { rounded: 'lg', width: 'half' },
})

type CardWrapperProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & { href?: string }

const CardWrapper = ({
  children,
  rounded,
  width,
  href,
  className,
  ...props
}: CardWrapperProps) => {
  className = cn(cardVariants({ rounded, width, className }))

  if (href) {
    return (
      <Link href={href} className={cn(className, 'block')}>
        {children}
      </Link>
    )
  }

  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export default CardWrapper
