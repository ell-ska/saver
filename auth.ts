import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import authConfig from '@/auth.config'
import { db } from '@/lib/db'

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: '/auth/log-in',
    error: '/auth/error',
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  callbacks: {
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
  ...authConfig,
})
