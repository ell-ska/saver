import { z } from 'zod'

export const createAccountSchema = z.object({
  name: z.string().min(1, {
    message: 'full name is required',
  }),
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
  password: z.string().min(1, {
    message: 'password is required',
  }),
})

export const detailsSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
})
