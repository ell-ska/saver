import { auth } from '@/auth'
import {
  apiAuthPrefix,
  authRoutes,
  defaultLoginRedirect,
  publicRoutes,
} from '@/routes'

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return null

  if (isAuthRoute) {
    if (isLoggedIn)
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl))
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    // TODO: add callback urls
    return Response.redirect('/auth/log-in')
  }

  return null
})

// don't invoke middleware on _next static routes
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
