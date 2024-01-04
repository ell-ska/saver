import { forwardRef } from 'react'

import { cn } from '@/utils/classnames'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  border?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ border, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'bg-transparent outline-none placeholder:text-slate-300',
          border &&
            'focus-visible:border-primary-dark rounded-lg border border-slate-300 px-2 py-1',
        )}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export default Input
