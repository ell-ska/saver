import { useCallback, useState } from 'react'

import { ActionReturn } from '@/utils/createSafeAction'

type ActionOptions = {
  onError?: (error: string) => void
}

export const useAction = <Input, Output>(
  action: (data: Input) => Promise<ActionReturn<Output>>,
  options: ActionOptions = {},
) => {
  const [data, setData] = useState<Output | undefined>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const execute = useCallback(
    async (data: Input) => {
      setIsLoading(true)

      try {
        const result = await action(data)
        if (!result) return

        if (result.error) {
          setError(result.error)
          options.onError?.(result.error)
        }

        if (result.data) {
          setData(result.data)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [action, options],
  )

  return {
    execute,
    data,
    error,
    isLoading,
  }
}
