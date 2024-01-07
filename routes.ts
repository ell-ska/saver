export const apiAuthPrefix = '/api/auth'

export const publicRoutes = ['/']

export const authRoutes = [
  '/auth/create-account',
  '/auth/log-in',
  '/auth/error',
]

export const getDefaultLoginRedirect = (userId: string | undefined) => {
  return userId ? `/${userId}` : '/'
}
