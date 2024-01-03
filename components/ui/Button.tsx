import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/classnames'

export const buttonVariants = cva('inline-flex outline-1 transition', {
  variants: {
    variant: {
      primary: [
        'bg-primary outline-primary-dark rounded-full',
        'hover:bg-primary-light',
        'focus-visible:bg-primary-light focus-visible:outline',
        'active:bg-primary',
        'disabled:bg-slate-200 disabled:text-slate-500',
      ],
      secondary: [
        'rounded-full outline outline-slate-800',
        'hover:bg-primary-light',
        'focus-visible:outline-primary-dark focus-visible:outline',
        'active:bg-primary',
        'disabled:text-slate-300 disabled:outline-slate-300 disabled:hover:bg-transparent',
      ],
      subtle: [
        'bg-slate-100 rounded-full',
        'hover:bg-slate-200',
        'focus-visible:bg-transparent focus-visible:outline',
        'active:bg-slate-100',
        'disabled:bg-slate-100 disabled:text-slate-500',
      ],
      ghost: [
        'rounded',
        'hover:bg-slate-100',
        'focus-visible:bg-transparent focus-visible:outline',
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
})

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = ({
  children,
  variant,
  size,
  className,
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
      {children}
    </button>
  )
}

export default Button
