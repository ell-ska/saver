import { forwardRef } from 'react'

import { cn } from '@/utils/classnames'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  unstyled?: boolean
  placeholderVisible?: boolean
  isError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ unstyled, placeholderVisible, isError, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'peer w-full text-base text-slate-800 outline-none placeholder:text-transparent',
          !unstyled &&
            'rounded-lg border border-transparent bg-slate-100 px-4 py-2',
          placeholderVisible && 'placeholder:text-slate-300',
          !unstyled && placeholderVisible && 'placeholder:text-slate-500',
          isError && 'border-secondary-dark',
          className,
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export default Input
