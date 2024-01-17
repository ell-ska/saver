'use client'

import { useAction } from 'next-safe-action/hooks'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { logIn } from '@/actions/log-in'
import { logInSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

const LogInForm = () => {
  const searchParams = useSearchParams()
  // TODO: handle url error 'OAuthAccountNotLinked'
  // TODO: add callback url

  const { execute, status } = useAction(logIn, {
    onError: ({ serverError }) => toast(serverError),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: searchParams.get('email') || '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit(execute)}
      className='flex w-full grow flex-col gap-6'
    >
      <FormField
        {...register('email')}
        error={errors.email}
        type='email'
        labelText='email'
      />
      {/* TODO: add forgot password link */}
      <FormField
        {...register('password')}
        error={errors.password}
        type='password'
        labelText='password'
      />
      <Button
        type='submit'
        disabled={status === 'executing'}
        loader={status === 'executing'}
      >
        {status === 'executing' ? 'logging in' : 'log in'}
      </Button>
    </form>
  )
}

export default LogInForm
