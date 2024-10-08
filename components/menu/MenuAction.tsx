import { Loader2 } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utils/classnames'

export const MenuAction = ({
  icon,
  text,
  shortcut,
  isLoading,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode
  text: string
  shortcut?: string
  isLoading?: boolean
}) => {
  return (
    <button
      className='inline-flex w-full items-center justify-between gap-16 border border-transparent px-4 py-2 outline-none hover:bg-slate-100 focus-visible:border-primary-dark'
      disabled={isLoading}
      {...props}
    >
      <div
        className={cn(
          'flex items-center gap-4 text-primary',
          isLoading && 'text-slate-300',
        )}
      >
        {isLoading ? <Loader2 size={16} className='animate-spin' /> : icon}
        <span className={cn('text-slate-800', isLoading && 'text-slate-300')}>
          {text}
        </span>
      </div>
      {shortcut && (
        <kbd
          className={cn(
            'hidden text-xs text-slate-400 md:inline',
            isLoading && 'text-slate-300',
          )}
        >
          {shortcut}
        </kbd>
      )}
    </button>
  )
}
