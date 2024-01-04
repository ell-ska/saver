import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

import Input, { InputProps } from './Input'

type FormFieldProps = Omit<InputProps, 'id' | 'htmlFor'> & {
  labelText: string
  error?: FieldError
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ labelText, name, error, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={name} hidden>
          {labelText}
        </label>
        <Input ref={ref} name={name} isError={!!error} {...props} />
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

export default FormField
