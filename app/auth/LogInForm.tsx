'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { logInSchema } from '@/lib/schemas'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  })

  // TODO: handle errors

  const onSubmit = (values: z.infer<typeof logInSchema>) => {
    // TODO: add log in functionality
    console.log({ values })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex w-full grow flex-col gap-6'
    >
      <FormField
        {...register('email')}
        type='email'
        labelText='enter your email'
        placeholder='email'
        border
      />
      {/* TODO: add forgot password link */}
      <FormField
        {...register('password')}
        type='password'
        labelText='enter your password'
        placeholder='password'
        border
      />
      <Button type='submit' disabled={isSubmitting} loader={isSubmitting}>
        {isSubmitting ? 'logging in' : 'log in'}
      </Button>
    </form>
  )
}

export default LogInForm
