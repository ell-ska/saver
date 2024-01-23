import { CheckCircle2 } from 'lucide-react'

const SelectedOverlay = () => {
  return (
    <div className='pointer-events-none absolute inset-0 bg-slate-800/50'>
      <CheckCircle2 className='absolute right-2 top-2 text-white' />
    </div>
  )
}

export default SelectedOverlay
