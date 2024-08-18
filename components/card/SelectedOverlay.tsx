import { CheckCircle2 } from 'lucide-react'

export const SelectedOverlay = () => {
  return (
    <div className='pointer-events-none absolute inset-0 bg-slate-800/50'>
      <CheckCircle2 className='absolute right-2 top-2 text-white' />
    </div>
  )
}
