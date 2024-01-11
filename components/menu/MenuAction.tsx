import { LucideIcon } from 'lucide-react'

type MenuActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  Icon: LucideIcon
  text: string
  shortcut?: string
}

const MenuAction = ({ Icon, text, shortcut, ...props }: MenuActionProps) => {
  return (
    <button
      className='inline-flex items-center justify-between gap-16 px-4 py-2 hover:bg-slate-100'
      {...props}
    >
      <div className='flex items-center gap-4'>
        <Icon className='text-primary' />
        {text}
      </div>
      <kbd className='hidden text-xs text-slate-400 md:inline'>{shortcut}</kbd>
    </button>
  )
}

export default MenuAction
