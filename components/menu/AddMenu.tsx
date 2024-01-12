import { Image as ImageIcon, Link, PlusCircle } from 'lucide-react'

import MenuWrapper from './MenuWrapper'
import MenuAction from './MenuAction'

const options = [
  // TODO: change to 'paste' if something copied to clipboard
  {
    icon: <Link />,
    text: 'link',
  },
  {
    icon: <ImageIcon />,
    text: 'image', // or video
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
  },
]

const AddMenu = () => {
  return (
    <MenuWrapper type='add' closeButton className='flex flex-col py-2'>
      {options.map((option) => (
        <MenuAction key={option.text} {...option} />
      ))}
    </MenuWrapper>
  )
}

export default AddMenu
