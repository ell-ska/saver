import { NextAuthConfig } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { logInSchema } from './lib/schemas'
import { db } from './lib/db'

export default {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedCredentials = logInSchema.safeParse(credentials)
        if (!validatedCredentials.success) return null

        const { email, password } = validatedCredentials.data

        const user = await db.user.findUnique({ where: { email } })
        if (!user || !user.password) return null

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (isPasswordMatch) return user

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
