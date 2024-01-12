import { Image as ImageIcon, Link, PlusCircle } from 'lucide-react'

import { useAction } from '@/hooks/useAction'
import { createBoard } from '@/actions/create-board'
import { toast } from '@/utils/toast'
import MenuWrapper from './MenuWrapper'
import MenuAction from './MenuAction'

const AddMenu = () => {
  const { execute, isLoading } = useAction(createBoard, {
    onError: (error) => toast(error),
  })

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
      text: isLoading ? 'creating new board' : 'create new board',
      onClick: () => execute(),
      isLoading,
      disabled: isLoading,
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
