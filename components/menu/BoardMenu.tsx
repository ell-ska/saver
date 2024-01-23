import { useParams } from 'next/navigation'
import {
  ArrowLeftRight,
  Copy,
  Eraser,
  Settings2,
  Share,
  Star,
  Users,
} from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import { useEdit } from '@/hooks/useEdit'
import MenuWrapper from './MenuWrapper'
import MenuAction from './MenuAction'

const BoardMenu = () => {
  const [openMenu, closeMenu] = useMenu((state) => [state.open, state.close])
  const [startEditing] = useEdit((state) => [state.start])

  const { boardId } = useParams<{ boardId: string }>()

  const options = [
    {
      icon: <Settings2 />,
      text: 'edit',
      onClick: () => {
        startEditing('board')
        closeMenu()
      },
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
      onClick: () => {
        openMenu('confirm', { confirm: { type: 'delete-board', boardId } })
      },
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
