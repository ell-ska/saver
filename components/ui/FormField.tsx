import { forwardRef } from 'react'

import Input, { InputProps } from './Input'

type FormFieldProps = Omit<InputProps, 'id' | 'htmlFor'> & { labelText: string }

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ labelText, name, ...props }, ref) => {
    return (
      <>
        <label htmlFor={name} hidden>
          {labelText}
        </label>
        <Input ref={ref} name={name} {...props} />
      </>
    )
  },
)
FormField.displayName = 'FormField'

export default FormField
