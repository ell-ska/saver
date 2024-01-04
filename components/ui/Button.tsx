import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'

import { cn } from '@/utils/classnames'

export const buttonVariants = cva(
  'inline-flex transition outline-none border border-transparent items-center justify-center',
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
        icon: 'p-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { loader?: boolean }

const Button = ({
  children,
  variant,
  size,
  className,
  loader,
  ...props
}: ButtonProps) => {
  size =
    size === undefined && (variant === 'subtle' || variant === 'ghost')
      ? 'sm'
      : size

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loader && <Loader2 size={16} className='animate-spin' />}
      {children}
    </button>
  )
}

export default Button
