'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

import { actionClient } from './utils/safe-action'
import { createAccountSchema } from '@/lib/schemas'
import { db } from '@/lib/data/db'

export const createAccount = actionClient
  .schema(createAccountSchema)
  .action(
    async ({ parsedInput: { email, name, password, confirmPassword } }) => {
      try {
        const existingUser = await db.user.findUnique({ where: { email } })
        if (existingUser) throw Error('email already taken')

        if (password !== confirmPassword) throw Error("passwords don't match")

        const hashedPassword = await bcrypt.hash(password, 10)

        await db.user.create({
          data: { name, email, password: hashedPassword },
        })
      } catch (error) {
        console.log('CREATE_ACCOUNT_ACTION_ERROR', error)
        throw Error('something went wrong')
      }

      redirect(`/auth/log-in?email=${email}`)
    },
  )
