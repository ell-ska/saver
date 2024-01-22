import { CardType } from '@prisma/client'

import { CardSize, CardWithNested } from '@/lib/types'
import ImageCard from './ImageCard'
import LinkCard from './LinkCard'

type CardMapProps = CardWithNested & {
  href?: string
  size?: CardSize
  className?: string
}

const CardMap = ({
  type,
  image,
  link,
  href,
  size = 'default',
  className,
}: CardMapProps) => {
  const cardMap: { [key in CardType]: React.ReactNode } = {
    [CardType.IMAGE]: image && (
      <ImageCard
        href={href}
        size={size}
        src={image.url}
        alt='' // TODO: add proper alt text
        width={image.width}
        height={image.height}
        className={className}
      />
    ),
    [CardType.LINK]: link && (
      <LinkCard href={href} size={size} {...link} className={className} />
    ),
  }

  return cardMap[type]
}

export default CardMap
