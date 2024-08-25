'use server'

import { isRedirectError } from 'next/dist/client/components/redirect'
import { AuthError } from 'next-auth'

import { actionClient } from './utils/safe-action'
import { signIn } from '@/auth'
import { defaultLoginRedirect } from '@/routes'
import { logInSchema } from '@/lib/schemas'
import { db } from '@/lib/data/db'

export const logIn = actionClient
  .schema(logInSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const existingUser = await db.user.findUnique({ where: { email } })
      if (!existingUser || !existingUser.email) {
        throw Error('email does not exist')
      }
      if (!existingUser.password) {
        throw Error('email in use with another provider')
      }

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
