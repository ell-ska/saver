import Input, { InputProps } from './Input'

type FormFieldProps = Omit<InputProps, 'id' | 'htmlFor'> & { labelText: string }

const FormField = ({ labelText, name, ...props }: FormFieldProps) => {
  return (
    <>
      <label htmlFor={name} hidden>
        {labelText}
      </label>
      <Input id={name} {...props} />
    </>
  )
}

export default FormField
