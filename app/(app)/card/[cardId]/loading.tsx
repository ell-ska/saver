import { Loader2 } from 'lucide-react'

const Loading = () => {
  return (
    <div className='grid w-full grow place-items-center'>
      <Loader2 className='animate-spin text-slate-200' />
    </div>
  )
}

export default Loading
