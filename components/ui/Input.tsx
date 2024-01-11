import { forwardRef } from 'react'

import { cn } from '@/utils/classnames'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  border?: boolean
  isError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ border, isError, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-transparent shadow-[inset_0px_0px_0px_999px_#fff] outline-none placeholder:text-slate-300',
          border &&
            'rounded-lg border border-slate-300 px-2 py-1 focus-visible:border-primary-dark',
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
