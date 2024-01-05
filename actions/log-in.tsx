'use server'

import { AuthError } from 'next-auth'
import { z } from 'zod'

import { signIn } from '@/auth'
import { defaultLoginRedirect } from '@/routes'
import { logInSchema } from '@/lib/schemas'
import { db } from '@/lib/db'
import { isRedirectError } from 'next/dist/client/components/redirect'

export const logIn = async (
  values: z.infer<typeof logInSchema>,
  callbackUrl?: string,
): Promise<{ error: string } | undefined> => {
  const validatedValues = logInSchema.safeParse(values)
  if (!validatedValues.success) return { error: 'invalid fields' }

  const { email, password } = validatedValues.data

  const existingUser = await db.user.findUnique({ where: { email } })
  if (!existingUser || !existingUser.email)
    return { error: 'email does not exist' }

  if (!existingUser.password)
    return { error: 'email in use with another provider' }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || defaultLoginRedirect,
    })
  } catch (error) {
    if (error instanceof AuthError && error.type === 'CredentialsSignin')
      return { error: 'invalid credentials' }

    if (isRedirectError(error)) throw error

    console.log('LOG_IN_ACTION_ERROR', error)
    return { error: 'something went wrong' }
  }
}
