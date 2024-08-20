import { CardType } from '@prisma/client'

import { CardSize, CardWithNested } from '@/lib/types'
import { ImageCard } from './ImageCard'
import { LinkCard } from './LinkCard'

export const CardMap = ({
  type,
  image,
  onClick,
  asLink,
  link,
  href,
  size = 'default',
  selected,
  className,
}: CardWithNested & {
  onClick?: () => void
  asLink?: boolean
  href?: string
  size?: CardSize
  selected?: boolean
  className?: string
}) => {
  const cardMap: { [key in CardType]: React.ReactNode } = {
    [CardType.IMAGE]: image && (
      <ImageCard
        onClick={onClick}
        asLink={asLink}
        href={href}
        size={size}
        selected={selected}
        className={className}
        src={image.url}
        blurhash={image.blurhash}
        alt='' // TODO: add proper alt text
        width={image.width}
        height={image.height}
      />
    ),
    [CardType.LINK]: link && (
      <LinkCard
        onClick={onClick}
        asLink={asLink}
        href={href}
        size={size}
        selected={selected}
        className={className}
        {...link}
      />
    ),
  }

  return cardMap[type]
}
