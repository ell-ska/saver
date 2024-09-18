'use client'

import * as TogglePrimitive from '@radix-ui/react-switch'

export const Toggle = (
  props: Omit<TogglePrimitive.SwitchProps, 'asChild' | 'className'>,
) => {
  return (
    <TogglePrimitive.Root
      {...props}
      className='h-4 w-7 rounded-full bg-primary transition-colors data-[state=checked]:bg-slate-200'
    >
      <TogglePrimitive.Thumb className='block size-3 translate-x-[2px] rounded-full bg-white transition-transform data-[state=checked]:translate-x-[14px]' />
    </TogglePrimitive.Root>
  )
}
