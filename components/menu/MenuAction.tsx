type MenuActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode
  text: string
  shortcut?: string
}

const MenuAction = ({ icon, text, shortcut, ...props }: MenuActionProps) => {
  return (
    <button
      className='inline-flex items-center justify-between gap-16 px-4 py-2 hover:bg-slate-100'
      {...props}
    >
      <div className='flex items-center gap-4 text-primary'>
        {icon}
        <span className='text-slate-800'>{text}</span>
      </div>
      <kbd className='hidden text-xs text-slate-400 md:inline'>{shortcut}</kbd>
    </button>
  )
}

export default MenuAction
