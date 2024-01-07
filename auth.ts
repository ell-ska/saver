import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Github from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { logInSchema } from '@/lib/schemas'

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Github({
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
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/log-in',
    error: '/auth/error',
  },
  callbacks: {
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
})
