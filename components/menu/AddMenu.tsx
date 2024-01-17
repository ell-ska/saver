import { Image as ImageIcon, Link, PlusCircle } from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import MenuWrapper from './MenuWrapper'
import MenuAction from './MenuAction'

const AddMenu = () => {
  const [openMenu] = useMenu((state) => [state.open])

  const options = [
    // TODO: change to 'paste' if something copied to clipboard
    {
      icon: <Link />,
      text: 'link',
      onClick: () => openMenu('add-link'),
    },
    {
      icon: <ImageIcon />,
      text: 'image', // or video
      onClick: () => openMenu('add-image'),
    },
    // {
    //   icon: <Camera />,
    //   text: 'camera',
    // },
    // {
    //   icon: <CaseSensitive />,
    //   text: 'note',
    // },
    // {
    //   icon: <File />,
    //   text: 'file',
    // },
    {
      icon: <PlusCircle className='path-white fill-primary' />,
      text: 'create new board',
      onClick: () => openMenu('add-board'),
    },
  ]

  return (
    <MenuWrapper type='add' closeButton className='flex flex-col py-2'>
      {options.map((option) => (
        <MenuAction key={option.text} {...option} />
      ))}
    </MenuWrapper>
  )
}

export default AddMenu
