'use server'

import { isRedirectError } from 'next/dist/client/components/redirect'
import { AuthError } from 'next-auth'

import { signIn } from '@/auth'
import { defaultLoginRedirect } from '@/routes'
import { db } from '@/lib/db'
import { action } from '@/lib/safeAction'
import { logInSchema } from '@/lib/schemas'

export const logIn = action(logInSchema, async ({ email, password }) => {
  const existingUser = await db.user.findUnique({ where: { email } })
  if (!existingUser || !existingUser.email) throw Error('email does not exist')
  if (!existingUser.password) throw Error('email in use with another provider')

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: defaultLoginRedirect,
    })
  } catch (error) {
    if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      throw Error('invalid credentials')
    }
    if (isRedirectError(error)) throw error

    console.log('LOG_IN_ACTION_ERROR', error)
    throw Error('something went wrong')
  }
})
