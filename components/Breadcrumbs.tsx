import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'

import { get } from '@/utils/get'
import { cn } from '@/utils/classnames'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/Skeleton'
import type { CardTitleResponse } from '@/app/api/card/title/[id]/route'
import type { BoardTitleResponse } from '@/app/api/board/title/[id]/route'

export const Breadcrumbs = () => {
  const router = useRouter()
  const { boardId, cardId } = useParams()

  const { data: crumbs, isPending } = useQuery<
    CardTitleResponse | BoardTitleResponse | undefined
  >({
    queryKey: ['title', cardId, boardId],
    queryFn: () => {
      if (cardId) {
        return get(`/api/card/title/${cardId}`)
      }
      if (boardId) {
        return get(`/api/board/title/${boardId}`)
      }
    },
  })

  return (
    <div className='flex items-center gap-1 overflow-hidden'>
      <Button
        onClick={router.back}
        variant='ghost'
        size='icon'
        icon={<ChevronLeft />}
        className='md:hidden'
      />
      <div className='flex items-center gap-1 overflow-hidden'>
        <Button
          asLink
          href='/home'
          variant='ghost'
          className='last hidden text-base last:inline-flex md:flex md:text-sm'
        >
          home
        </Button>
        <span className='hidden text-slate-300 md:inline'>/</span>
        {isPending && <Skeleton rounded='sm' className='h-4 w-20' />}
        {isPending && cardId && (
          <>
            <span className='hidden text-slate-300 md:inline'>/</span>
            <Skeleton rounded='sm' className='h-4 w-20' />
          </>
        )}
        {crumbs &&
          crumbs.map(({ id, title, type }, index) => (
            <div key={id} className='hidden items-center last:flex md:flex'>
              <Button
                asLink
                href={`/${type}/${id}`}
                variant='ghost'
                className='overflow-hidden text-base md:text-sm'
              >
                <span className='truncate md:max-w-xs'>{title}</span>
              </Button>
              <span
                className={cn(
                  'ml-1 text-slate-300',
                  index === crumbs.length - 1 && 'hidden',
                )}
              >
                /
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
