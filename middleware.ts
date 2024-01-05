import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  return null
})

// don't invoke middleware on _next static routes
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
