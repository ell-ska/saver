'use client'

import { useEdit } from '@/hooks/useEdit'
import { CardWithNested } from '@/lib/types'
import { cn } from '@/utils/classnames'
import CardMap from '@/components/card/CardMap'

type MasonryProps = {
  content: CardWithNested[]
  className?: string
}

const Masonry = ({ content, className }: MasonryProps) => {
  const [editing, type, selected, toggleSelect] = useEdit((state) => [
    state.isEditing,
    state.type,
    state.selected,
    state.toggleSelected,
  ])
  const isEditing = editing && type === 'board'

  return (
    <div className={cn('columns-xs gap-4 space-y-4', className)}>
      {content.map((card) => (
        <CardMap
          key={card.id}
          onClick={() => toggleSelect(card.id)}
          asLink={!isEditing}
          href={`/card/${card.id}`}
          selected={selected.includes(card.id)}
          {...card}
        />
      ))}
    </div>
  )
}

export default Masonry
