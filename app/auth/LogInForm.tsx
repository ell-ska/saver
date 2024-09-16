'use client'

import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { logIn } from '@/actions/log-in'
import { logInSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'

export const LogInForm = () => {
  const searchParams = useSearchParams()
  // TODO: handle url error 'OAuthAccountNotLinked'

  const { mutate, isPending } = useMutation({
    mutationFn: logIn,
    onError: (error) => toast(error.message),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      callbackUrl: searchParams.get('callback') || undefined,
      email: searchParams.get('email') || '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className='flex w-full grow flex-col gap-6'
    >
      <FormField
        {...register('email')}
        error={errors.email}
        type='email'
        labelText='email'
      />
      {/* TODO-t95: add forgot password link */}
      <FormField
        {...register('password')}
        error={errors.password}
        type='password'
        labelText='password'
      />
      <Button type='submit' disabled={isPending} loader={isPending}>
        {isPending ? 'logging in' : 'log in'}
      </Button>
    </form>
  )
}
