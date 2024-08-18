import Link from 'next/link'
import { VariantProps, cva } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'

import { cn } from '@/utils/classnames'

const cardVariants = cva('border border-slate-200 overflow-hidden relative', {
  variants: {
    rounded: { sm: 'rounded-sm', lg: 'rounded-lg' },
    width: { half: 'col-span-1', full: 'col-span-2' },
  },
  defaultVariants: { rounded: 'lg', width: 'half' },
})

export const CardWrapper = ({
  children,
  rounded,
  width,
  asLink,
  href,
  onClick,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants> & { asLink?: boolean; href?: string }) => {
  className = cn(cardVariants({ rounded, width, className }))

  if (asLink && href) {
    return (
      <Link href={href} className={cn(className, 'block')}>
        {children}
      </Link>
    )
  }

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      className={className}
      {...props}
    >
      {children}
    </div>
  )
}
