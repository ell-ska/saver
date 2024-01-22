import {
  ArrowLeftRight,
  Copy,
  Eraser,
  Settings2,
  Share,
  Star,
  Users,
} from 'lucide-react'

import MenuWrapper from './MenuWrapper'
import MenuAction from './MenuAction'

const BoardMenu = () => {
  const options = [
    {
      icon: <Settings2 />,
      text: 'edit',
      onClick: () => {},
    },
    // {
    //   icon: <Star />,
    //   text: 'make favorite', // remove from favorite
    //   onClick: () => {},
    // },
    // {
    //   icon: <ArrowLeftRight />,
    //   text: 'move',
    //   onClick: () => {},
    // },
    // {
    //   icon: <Copy />,
    //   text: 'duplicate',
    //   onClick: () => {},
    // },
    {
      icon: <Eraser />,
      text: 'delete',
      onClick: () => {},
    },
    // {
    //   icon: <Users />,
    //   text: 'collaborators',
    //   onClick: () => {},
    // },
    // {
    //   icon: <Share />,
    //   text: 'share',
    //   onClick: () => {},
    // },
  ]

  return (
    <MenuWrapper type='board' closeButton className='flex flex-col py-2'>
      {options.map((option) => (
        <MenuAction key={option.text} {...option} />
      ))}
    </MenuWrapper>
  )
}

export default BoardMenu
