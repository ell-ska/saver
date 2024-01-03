import { cn } from '@/utils/classnames'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  border?: boolean
}

const Input = ({ border, className, ...props }: InputProps) => {
  return (
    <input
      className={cn(
        'bg-transparent outline-none placeholder:text-slate-300',
        border &&
          'focus-visible:border-primary-dark rounded-lg border border-slate-300 px-2 py-1',
      )}
      {...props}
    />
  )
}

export default Input
