'use client'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { createAccount } from '@/actions/create-account'
import { createAccountSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'

export const CreateAccountForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: createAccount,
    onError: (error) => toast(error.message),
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
      onSubmit={handleSubmit((values) => mutate(values))}
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
      <Button type='submit' disabled={isPending} loader={isPending}>
        {isPending ? 'creating account' : 'create account'}
      </Button>
    </form>
  )
}
