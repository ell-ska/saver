import { NextResponse } from 'next/server'

export const handleServerError = (
  error: unknown,
  itentifier: `[${string}_API_ERROR]`,
) => {
  console.error(itentifier, error)
  return new NextResponse(null, {
    status: 500,
    statusText: 'something went wrong',
  })
}
