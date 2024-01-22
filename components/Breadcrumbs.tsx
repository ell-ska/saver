import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { ChevronLeft } from 'lucide-react'

import { getTitle } from '@/actions/get-title'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'

type BreadcrumbsProps = {}

const Breadcrumbs = ({}: BreadcrumbsProps) => {
  const router = useRouter()
  const { boardId, cardId } = useParams<{ boardId: string; cardId: string }>()

  const { data } = useSWR(`/title/${boardId || cardId}`, async () => {
    return (await getTitle({ boardId, cardId })).data
  })

  if (!data) return null
  const crumbs = [{ title: 'home', id: 'home', type: 'home' }, ...data]

  return (
    <div className='flex items-center gap-1 overflow-hidden'>
      <Button
        onClick={router.back}
        variant='ghost'
        size='icon'
        icon={<ChevronLeft />}
        className='md:hidden'
      />
      {crumbs.map(({ id, title, type }, index) => (
        <div
          key={id}
          className='hidden items-center gap-1 overflow-hidden last:flex md:flex'
        >
          <Button
            asLink
            href={type === 'home' ? '/home' : `/${type}/${id}`}
            variant='ghost'
            className='overflow-hidden text-base md:text-sm'
          >
            <span className='truncate md:max-w-xs'>{title}</span>
          </Button>
          {index !== crumbs.length - 1 && (
            <span className='text-slate-300'>/</span>
          )}
        </div>
      ))}
    </div>
  )
}

export default Breadcrumbs
