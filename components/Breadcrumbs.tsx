import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { ChevronLeft } from 'lucide-react'

import { getTitle } from '@/actions/get-title'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'

type BreadcrumbsProps = {}

const Breadcrumbs = ({}: BreadcrumbsProps) => {
  const router = useRouter()
  const params = useParams()
  const { boardId, cardId } = params

  const { data } = useSWR(`/title/${boardId || cardId}`, async () => {
    const validBoardId = typeof boardId === 'string' ? boardId : undefined
    const validCardId = typeof cardId === 'string' ? cardId : undefined
    if (!validBoardId && !validCardId) return

    return (await getTitle({ boardId: validBoardId, cardId: validCardId })).data
  })

  if (!data) return null
  const crumbs = [{ title: 'home', id: 'home', type: 'home' }, ...data]

  return (
    <div className='touch-device:gap-0 flex items-center gap-1'>
      <Button
        onClick={router.back}
        variant='ghost'
        size='icon'
        icon={<ChevronLeft />}
        className='touch-device:inline-flex hidden'
      />
      {crumbs.map(({ id, title, type }, index) => (
        <div key={id} className='space-x-1'>
          <Button
            asLink
            href={type === 'home' ? '/home' : `/${type}/${id}`}
            variant='ghost'
            className={cn(
              'text-base md:text-sm',
              title === 'home' &&
                'touch-device:pointer-events-none touch-device:hidden',
            )}
          >
            <span className='max-w-xs truncate'>{title}</span>
          </Button>
          {index !== crumbs.length - 1 && (
            <span
              className={cn(
                'text-slate-300',
                title === 'home' && 'touch-device:hidden',
              )}
            >
              /
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumbs
