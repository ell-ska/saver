import { z } from 'zod'

export type ActionReturn<Output> = { error?: string; data?: Output }

export const createSafeAction = <Input, Output>(
  handler: (data: Input) => Promise<ActionReturn<Output>>,
  schema: z.Schema<Input>,
) => {
  return async (data: Input): Promise<ActionReturn<Output>> => {
    const validated = schema.safeParse(data)

    if (!validated.success) return { error: 'invalid fields' }
    return handler(validated.data)
  }
}
