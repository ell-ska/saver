import { cn } from '@/utils/classnames'

type SkeletonProps = {
  rounded?: 'sm' | 'default'
  className?: string
}

const Skeleton = ({ rounded = 'default', className }: SkeletonProps) => {
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

export default Skeleton
