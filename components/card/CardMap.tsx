import { CardType } from '@prisma/client'

import { CardSize, CardWithNested } from '@/lib/types'
import ImageCard from './ImageCard'
import LinkCard from './LinkCard'

type CardMapProps = CardWithNested & { size?: CardSize; className?: string }

const CardMap = ({
  type,
  image,
  link,
  size = 'default',
  className,
}: CardMapProps) => {
  const cardMap: { [key in CardType]: React.ReactNode } = {
    [CardType.IMAGE]: image && (
      <ImageCard
        src={image.url}
        alt='' // TODO: add proper alt text
        width={image.width}
        height={image.height}
        size={size}
        className={className}
      />
    ),
    [CardType.LINK]: link && (
      <LinkCard {...link} size={size} className={className} />
    ),
  }

  return cardMap[type]
}

export default CardMap
