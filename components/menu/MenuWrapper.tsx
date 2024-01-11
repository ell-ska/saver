'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { menuType, useMenu } from '@/hooks/useMenu'
import { cn } from '@/utils/classnames'

type MenuWrapperProps = {
  children: React.ReactNode
  type: menuType
  closeButton?: boolean
  className?: string
}

const MenuWrapper = ({
  children,
  type,
  closeButton,
  className,
}: MenuWrapperProps) => {
  const { type: openType, isOpen, onClose } = useMenu()
  const modalIsOpen = isOpen && openType === type

  return (
    <Dialog.Root open={modalIsOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className='absolute inset-0 bg-slate-800/50 md:hidden' />
        <Dialog.Content
          className={cn(
            'absolute bottom-0 left-0 right-0 rounded-t-lg border-slate-300 bg-white md:bottom-auto md:left-auto md:right-8 md:top-20 md:rounded-lg md:border',
            className,
          )}
        >
          {children}
          {closeButton && (
            <Dialog.Close className='absolute right-4 top-4 text-slate-300 md:hidden'>
              <X />
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default MenuWrapper
