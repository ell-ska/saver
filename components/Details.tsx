'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Board } from '@prisma/client'

import { detailsSchema } from '@/lib/schemas'
import { cn } from '@/utils/classnames'
import FormField from '@/components/ui/FormField'

type DetailsProps = Pick<Board, 'id' | 'title' | 'description'>

const Details = ({ title, description }: DetailsProps) => {
  const isEditing = false // TODO: change when adding board menu

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      title: title ?? '',
      description: description ?? '',
    },
  })

  const onSubmit = (values: z.infer<typeof detailsSchema>) => {
    if (values.title === title && values.description === description) return

    console.log(values) // TODO: handle edit request, wait until i know how fetching is done
  }

  if (isEditing)
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          {...register('title', {
            onBlur: handleSubmit(onSubmit),
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
            onBlur: handleSubmit(onSubmit),
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
      <h2 className={cn('mb-1 text-2xl font-bold', !title && 'text-slate-400')}>
        {title || 'give me a name'}
      </h2>
      {description && (
        <p className={cn('text-sm', !title && 'text-slate-400')}>
          {description}
        </p>
      )}
    </div>
  )
}

export default Details
