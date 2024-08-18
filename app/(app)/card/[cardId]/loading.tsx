import { Loader2 } from 'lucide-react'

export default function CardsLoading() {
  return (
    <div className='grid w-full grow place-items-center'>
      <Loader2 className='animate-spin text-slate-200' />
    </div>
  )
}
