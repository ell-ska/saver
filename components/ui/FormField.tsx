import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

import { cn } from '@/utils/classnames'
import { Input, type Props as InputProps } from './Input'

type Props = Omit<InputProps, 'id' | 'htmlFor'> & {
  labelText: string
  labelHidden?: boolean
  error?: FieldError
  unstyled?: boolean
}

export const FormField = forwardRef<HTMLInputElement, Props>(
  (
    { labelText, labelHidden, error, unstyled, name, placeholder, ...props },
    ref,
  ) => {
    return (
      <div className='group relative'>
        <Input
          ref={ref}
          name={name}
          id={name}
          isError={!!error}
          unstyled={unstyled}
          placeholderVisible={unstyled || labelHidden}
          placeholder={placeholder || labelText}
          {...props}
        />
        <label
          htmlFor={name}
          hidden={unstyled || labelHidden}
          className={cn(
            'absolute -top-2 left-2 cursor-text text-xs text-slate-500 transition-all ',
            'peer-focus-visible:-top-2 peer-focus-visible:left-2 peer-focus-visible:text-xs',
            'peer-placeholder-shown:left-4 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base',
            error && '-top-4 peer-focus-visible:-top-4',
          )}
        >
          {labelText}
        </label>
        {error && (
          <span className='text-sm lowercase text-secondary-dark'>
            {error.message}
          </span>
        )}
      </div>
    )
  },
)
FormField.displayName = 'FormField'
