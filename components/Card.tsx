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

type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & { href?: string }

const Card = ({
  children,
  rounded,
  width,
  href,
  className,
  ...props
}: CardProps) => {
  className = cn(cardVariants({ rounded, width, className }))

  if (href) {
    return (
      <Link href={href} className={className}>
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

export default Card
