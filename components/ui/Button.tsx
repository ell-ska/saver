import Link from 'next/link'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/utils/classnames'

export const buttonVariants = cva(
  'inline-flex whitespace-nowrap transition outline-none border border-transparent items-center justify-center',
  {
    variants: {
      variant: {
        primary: [
          'bg-primary rounded-full',
          'hover:bg-primary-light',
          'focus-visible:bg-primary-light focus-visible:border focus-visible:border-primary-dark',
          'active:bg-primary',
          'disabled:bg-slate-200 disabled:text-slate-500',
        ],
        secondary: [
          'rounded-full border border-slate-800',
          'hover:bg-primary-light',
          'focus-visible:border-primary-dark',
          'active:bg-primary',
          'disabled:text-slate-300 disabled:border-slate-300 disabled:hover:bg-transparent',
        ],
        subtle: [
          'bg-slate-100 rounded-full',
          'hover:bg-slate-200',
          'focus-visible:bg-transparent focus-visible:border-primary-dark',
          'active:bg-slate-100',
          'disabled:bg-slate-100 disabled:text-slate-500',
        ],
        ghost: [
          'rounded',
          'hover:bg-slate-100',
          'focus-visible:bg-transparent focus-visible:border-primary-dark',
          'active:bg-slate-50',
          'disabled:text-slate-300 disabled:hover:bg-transparent',
        ],
      },
      size: {
        md: 'gap-2 px-4 py-2 text-base',
        sm: 'gap-1 px-2 py-[2px] text-sm',
        icon: 'p-[2px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asLink?: boolean
    href?: string
    icon?: React.ReactNode
    loader?: boolean
  }

const Button = ({
  children,
  variant,
  size,
  asLink,
  href,
  icon,
  loader,
  className,
  ...props
}: ButtonProps) => {
  size =
    size === undefined && (variant === 'subtle' || variant === 'ghost')
      ? 'sm'
      : size

  className = cn(buttonVariants({ variant, size, className }))

  if (asLink && href) {
    return (
      <Link href={href} className={className}>
        {children}
        {icon}
      </Link>
    )
  }

  return (
    <button className={className} {...props}>
      {className.includes('justify-between') ? (
        <div
          className={cn('flex items-center', size === 'sm' ? 'gap-1' : 'gap-2')}
        >
          {loader && <Loader2 size={16} className='animate-spin' />}
          {children}
        </div>
      ) : (
        <>
          {loader && <Loader2 size={16} className='animate-spin' />}
          {children}
        </>
      )}
      {icon}
    </button>
  )
}

export default Button
