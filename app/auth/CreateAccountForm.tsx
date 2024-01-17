'use client'

import { useAction } from 'next-safe-action/hooks'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createAccount } from '@/actions/create-account'
import { createAccountSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

const CreateAccountForm = () => {
  const { execute, status } = useAction(createAccount, {
    onError: ({ serverError }) => toast(serverError),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
  })

  return (
    <form
      onSubmit={handleSubmit(execute)}
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
      <Button
        type='submit'
        disabled={status === 'executing'}
        loader={status === 'executing'}
      >
        {status === 'executing' ? 'creating account' : 'create account'}
      </Button>
    </form>
  )
}

export default CreateAccountForm
