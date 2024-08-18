import Skeleton from '@/components/Skeleton'

export default function BoardLoading() {
  return (
    <>
      <Skeleton rounded='sm' className='mb-1 h-8 w-32' />
      <Skeleton rounded='sm' className='h-5 w-48' />
      <div className='mt-6 grow columns-xs gap-4 space-y-4'>
        <Skeleton className='h-64' />
        <Skeleton className='h-64' />
        <Skeleton className='h-64' />
      </div>
    </>
  )
}
