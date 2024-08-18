'use client'

import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Board } from '@prisma/client'

import { useEdit } from '@/hooks/useEdit'
import { boardDetailsSchema } from '@/lib/schemas'
import { FormField } from '@/components/ui/FormField'

export const Details = ({
  title,
  description,
}: Pick<Board, 'id' | 'title' | 'description'>) => {
  const [editing, type, registerEdit] = useEdit((state) => [
    state.isEditing,
    state.type,
    state.registerEdit,
  ])
  const isEditing = editing && type === 'board'

  const { boardId } = useParams<{ boardId: string }>()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof boardDetailsSchema>>({
    resolver: zodResolver(boardDetailsSchema),
    defaultValues: {
      title: title,
      description: description ?? '',
    },
  })

  const onChange = (values: z.infer<typeof boardDetailsSchema>) => {
    registerEdit({ details: { ...values, boardId } })
  }

  if (isEditing)
    return (
      <form onSubmit={handleSubmit(onChange)}>
        <FormField
          {...register('title', {
            onChange: handleSubmit(onChange),
          })}
          error={errors.title}
          labelText='board title'
          type='text'
          placeholder='give me a name'
          unstyled
          className='mb-[1px] text-2xl font-bold placeholder:text-slate-400'
        />
        <FormField
          {...register('description', {
            onChange: handleSubmit(onChange),
          })}
          error={errors.description}
          labelText='board description'
          type='text'
          placeholder='add a description'
          unstyled
          className='text-sm placeholder:text-slate-400'
        />
        <input type='submit' hidden />
      </form>
    )

  return (
    <div>
      <h2 className='mb-1 text-2xl font-bold'>{title}</h2>
      {description && <p className='text-sm'>{description}</p>}
    </div>
  )
}
