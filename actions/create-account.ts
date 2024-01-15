'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

import { createAccountSchema } from '@/lib/schemas'
import { db } from '@/lib/db'
import { ActionReturn, createSafeAction } from '@/utils/createSafeAction'

const handler = async (
  values: z.infer<typeof createAccountSchema>,
): Promise<ActionReturn<undefined>> => {
  const { email, name, password, confirmPassword } = values

  const existingUser = await db.user.findUnique({ where: { email } })
  if (existingUser) return { error: 'email already taken' }

  if (password !== confirmPassword) return { error: "passwords don't match" }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await db.user.create({ data: { name, email, password: hashedPassword } })
  } catch (error) {
    console.log('CREATE_ACCOUNT_ACTION_ERROR', error)
    return { error: 'something went wrong' }
  }

  redirect(`/auth/log-in?email=${email}`)
}

export const createAccount = createSafeAction(handler, createAccountSchema)
