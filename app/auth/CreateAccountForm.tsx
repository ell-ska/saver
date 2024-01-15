'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createAccount } from '@/actions/create-account'
import { createAccountSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

const CreateAccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
  })

  const onSubmit = async (values: z.infer<typeof createAccountSchema>) => {
    try {
      const data = await createAccount(values)
      if (data?.error) toast(data.error)
    } catch (error) {
      toast('something went wrong')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full grow flex-col gap-6'
    >
      <FormField
        {...register('name')}
        error={errors.name}
        type='text'
        labelText='full name'
      />
      <FormField
        {...register('email')}
        error={errors.email}
        type='email'
        labelText='email'
      />
      <FormField
        {...register('password')}
        error={errors.password}
        type='password'
        labelText='password'
      />
      <FormField
        {...register('confirmPassword')}
        error={errors.confirmPassword}
        type='password'
        labelText='confirm password'
      />
      <Button type='submit' disabled={isSubmitting} loader={isSubmitting}>
        {isSubmitting ? 'creating account' : 'create account'}
      </Button>
    </form>
  )
}

export default CreateAccountForm
