'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { action } from '@/lib/safeAction'
import { createAccountSchema } from '@/lib/schemas'

export const createAccount = action(
  createAccountSchema,
  async ({ email, name, password, confirmPassword }) => {
    const existingUser = await db.user.findUnique({ where: { email } })
    if (existingUser) throw Error('email already taken')

    if (password !== confirmPassword) throw Error("passwords don't match")

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      await db.user.create({ data: { name, email, password: hashedPassword } })
    } catch (error) {
      console.log('CREATE_ACCOUNT_ACTION_ERROR', error)
      throw Error('something went wrong')
    }

    redirect(`/auth/log-in?email=${email}`)
  },
)
