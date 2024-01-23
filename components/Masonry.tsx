'use client'

import { useEffect } from 'react'

import { useEdit } from '@/hooks/useEdit'
import { CardWithNested } from '@/lib/types'
import { cn } from '@/utils/classnames'
import CardMap from '@/components/card/CardMap'

type MasonryProps = {
  cards: CardWithNested[]
  className?: string
}

const Masonry = ({ cards, className }: MasonryProps) => {
  const [editing, type, selected, toggleSelect, setAllCards, cancelEditing] =
    useEdit((state) => [
      state.isEditing,
      state.type,
      state.selected,
      state.toggleSelected,
      state.setAllCards,
      state.cancel,
    ])
  const isEditing = editing && type === 'board'

  useEffect(() => {
    setAllCards(cards.map((card) => card.id))
    cancelEditing()
  }, [cards])

  return (
    <div className={cn('columns-xs gap-4 space-y-4', className)}>
      {cards.map((card) => (
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
