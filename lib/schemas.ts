import { z } from 'zod'

export const createAccountSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6, {
    message: 'a minimum of 6 characters required',
  }),
  confirmPassword: z.string().min(6, {
    message: 'a minimum of 6 characters required',
  }),
})

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
