import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import {
  apiAuthPrefix,
  authRoutes,
  defaultLoginRedirect,
  publicRoutes,
} from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return

  if (isAuthRoute) {
    if (isLoggedIn)
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl))
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(
      new URL(`/auth/log-in?callback=${nextUrl.pathname}`, nextUrl),
    )
  }

  return
})

// don't invoke middleware on _next static routes
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
