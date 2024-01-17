import { CardType } from '@prisma/client'

import { CardWithNested } from '@/lib/types'
import { cn } from '@/utils/classnames'
import ImageCard from '@/components/card/ImageCard'
import LinkCard from '@/components/card/LinkCard'

type MasonryProps = {
  content: CardWithNested[]
  className?: string
}

const Masonry = ({ content, className }: MasonryProps) => {
  return (
    <div className={cn('columns-xs gap-4 space-y-4', className)}>
      {content.map(({ id, type, image, link }) => {
        const cardMap: { [key in CardType]: React.ReactNode } = {
          [CardType.IMAGE]: image && (
            <ImageCard
              src={image.url}
              alt='' // TODO: add proper alt text
              width={image.width}
              height={image.height}
              key={id}
            />
          ),
          [CardType.LINK]: link && <LinkCard {...link} key={id} />,
        }

        return cardMap[type]
      })}
    </div>
  )
}

export default Masonry
