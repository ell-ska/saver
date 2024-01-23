import { CardWithNested } from '@/lib/types'
import { cn } from '@/utils/classnames'
import CardMap from '@/components/card/CardMap'

type MasonryProps = {
  content: CardWithNested[]
  className?: string
}

const Masonry = ({ content, className }: MasonryProps) => {
  return (
    <div className={cn('columns-xs gap-4 space-y-4', className)}>
      {content.map((card) => (
        <CardMap key={card.id} asLink href={`/card/${card.id}`} {...card} />
      ))}
    </div>
  )
}

export default Masonry
