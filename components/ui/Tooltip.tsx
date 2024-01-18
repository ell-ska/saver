'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

type TooltipProps = {
  children: React.ReactNode
  label: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
}

const Tooltip = ({
  children,
  label,
  side = 'right',
  align = 'center',
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            side={side}
            align={align}
            sideOffset={8}
            className='rounded-full bg-slate-800 px-3 py-1 text-sm text-white data-[state=closed]:animate-fade-out data-[state=delayed-open]:animate-fade-in'
          >
            {label}
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
