'use server'

import { isRedirectError } from 'next/dist/client/components/redirect'
import { AuthError } from 'next-auth'
import { z } from 'zod'

import { signIn } from '@/auth'
import { defaultLoginRedirect } from '@/routes'
import { logInSchema } from '@/lib/schemas'
import { db } from '@/lib/db'
import { ActionReturn, createSafeAction } from '@/utils/createSafeAction'

const handler = async (
  values: z.infer<typeof logInSchema>,
  callbackUrl?: string,
): Promise<ActionReturn<undefined>> => {
  const { email, password } = values

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

export const logIn = createSafeAction(handler, logInSchema)
