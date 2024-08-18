import Skeleton from '@/components/Skeleton'

export default function Loading() {
  return (
    <div className='space-y-8'>
      <div>
        <Skeleton rounded='sm' className='mb-4 h-7 w-32 md:mb-6' />
        <div className='grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Skeleton className='h-48' />
          <Skeleton className='h-48' />
          <Skeleton className='h-48' />
        </div>
      </div>
      <div>
        <Skeleton rounded='sm' className='mb-4 h-7 w-32 md:mb-6' />
        <div className='grid grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Skeleton className='h-48' />
          <Skeleton className='h-48' />
          <Skeleton className='h-48' />
        </div>
      </div>
    </div>
  )
}
