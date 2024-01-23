'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { MenuType, useMenu } from '@/hooks/useMenu'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'

type MenuWrapperProps = {
  children: React.ReactNode
  type: MenuType
  closeButton?: boolean
  position?: 'top-right' | 'center'
  className?: string
}

const MenuWrapper = ({
  children,
  type,
  closeButton,
  position = 'top-right',
  className,
}: MenuWrapperProps) => {
  const { type: openType, isOpen, close } = useMenu()
  const modalIsOpen = isOpen && openType === type

  const path = usePathname()

  useEffect(() => {
    close()
  }, [path, close])

  return (
    <Dialog.Root open={modalIsOpen} onOpenChange={close}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'absolute inset-0 z-40 bg-slate-800/50',
            position === 'top-right' && 'md:hidden',
          )}
        />
        <Dialog.Content
          className={cn(
            'absolute bottom-0 left-0 right-0 z-50 max-h-[calc(100vh-4rem)] rounded-t-lg border-slate-300 bg-white md:bottom-auto md:left-auto md:right-8 md:top-20 md:rounded-lg md:border',
            position === 'center' &&
              'w-full md:left-1/2 md:top-1/2 md:max-w-sm md:-translate-x-1/2 md:-translate-y-1/2',
            className,
          )}
        >
          {children}
          {closeButton && (
            <Dialog.Close
              asChild
              className={cn(
                'absolute right-4 top-4 rounded text-slate-300 hover:bg-slate-100',
                position === 'top-right' && 'md:hidden',
              )}
            >
              <Button variant='ghost' className='p-0' icon={<X />} />
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MenuWrapper
