import { z } from 'zod'
import { CardType } from '@prisma/client'

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

export const boardDetailsSchema = z.object({
  title: z.string().min(1, {
    message: 'title is required',
  }),
  description: z.string().optional(),
})

const baseCardSchema = z.object({
  parentBoardId: z.string(),
  caption: z.string().optional(),
})

export const createImageCardSchema = baseCardSchema.merge(
  z.object({
    type: z.literal(CardType.IMAGE),
    image: z.union([z.instanceof(FormData), z.string().url()]),
  }),
)

export const createLinkCardSchema = baseCardSchema.merge(
  z.object({
    type: z.literal(CardType.LINK),
    url: z.string().url(),
  }),
)

export const createCardSchema = z.discriminatedUnion('type', [
  createImageCardSchema,
  createLinkCardSchema,
])
