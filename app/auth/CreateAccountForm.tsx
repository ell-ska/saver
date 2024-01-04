'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createAccountSchema } from '@/lib/schemas'
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

  // TODO: handle errors

  const onSubmit = (values: z.infer<typeof createAccountSchema>) => {
    // TODO: add create account functionality
    console.log({ values })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full grow flex-col gap-6'
    >
      <FormField
        {...register('fullName')}
        type='text'
        labelText='enter your full name'
        placeholder='full name'
        border
      />
      <FormField
        {...register('email')}
        type='email'
        labelText='enter your email'
        placeholder='email'
        border
      />
      <FormField
        {...register('password')}
        type='password'
        labelText='enter your password'
        placeholder='password'
        border
      />
      <FormField
        {...register('confirmPassword')}
        type='password'
        labelText='confirm your password'
        placeholder='confirm password'
        border
      />
      <Button type='submit' disabled={isSubmitting} loader={isSubmitting}>
        {isSubmitting ? 'creating account' : 'create account'}
      </Button>
    </form>
  )
}

export default CreateAccountForm
