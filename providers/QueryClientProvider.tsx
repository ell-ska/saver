'use client'

import {
  QueryClient,
  QueryClientProvider as OriginalQueryClientProvider,
} from '@tanstack/react-query'
import type { ReactNode } from 'react'

const makeQueryClient = () => {
  return new QueryClient()
}

let browserQueryClient: QueryClient | undefined = undefined

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export const QueryClientProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient()

  return (
    <OriginalQueryClientProvider client={queryClient}>
      {children}
    </OriginalQueryClientProvider>
  )
}
