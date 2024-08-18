import { cn } from '@/utils/classnames'

export const Skeleton = ({
  rounded = 'default',
  className,
}: {
  rounded?: 'sm' | 'default'
  className?: string
}) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-slate-100',
        rounded === 'sm' && 'rounded-sm',
        className,
      )}
    />
  )
}
