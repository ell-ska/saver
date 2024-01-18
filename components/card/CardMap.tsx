import { CardType } from '@prisma/client'

import { CardWithNested } from '@/lib/types'
import ImageCard from './ImageCard'
import LinkCard from './LinkCard'

type CardMapProps = CardWithNested

const CardMap = ({ type, image, link }: CardMapProps) => {
  const cardMap: { [key in CardType]: React.ReactNode } = {
    [CardType.IMAGE]: image && (
      <ImageCard
        src={image.url}
        alt='' // TODO: add proper alt text
        width={image.width}
        height={image.height}
      />
    ),
    [CardType.LINK]: link && <LinkCard {...link} />,
  }

  return cardMap[type]
}

export default CardMap
