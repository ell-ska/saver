import { toast as _toast, ExternalToast } from 'sonner'
import { AlertCircle } from 'lucide-react'

import { cn } from './classnames'

type toastColor = 'default' | 'secondary'
type toastOptions = Omit<ExternalToast, 'unstyled'> & { color?: toastColor }

export const toast = (message: string, options?: toastOptions) => {
  const color = options?.color || 'default'
  const icon = options?.icon || <AlertCircle size={18} />

  _toast(message, {
    unstyled: true,
    classNames: {
      toast: cn(
        'p-4 inline-flex items-center gap-2 border rounded-lg w-full shadow-[0px_4px_8px] shadow-slate-800/10',
        color === 'default' && 'border-slate-200 bg-white text-slate-800',
        color === 'secondary' &&
          'border-secondary-dark bg-secondary-light text-secondary-dark',
      ),
      title: 'font-primary',
    },
    icon,
    ...options,
  })
}
