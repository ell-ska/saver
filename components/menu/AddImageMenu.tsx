'use client'

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import * as Tabs from '@radix-ui/react-tabs'
import { Link, UploadCloud } from 'lucide-react'

import { createCard } from '@/actions/create-card'
import { useMenu } from '@/hooks/useMenu'
import { useParentBoard } from '@/hooks/useParentBoard'
import { createImageCardSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import { isImage } from '@/utils/isImage/client'
import { cn } from '@/utils/classnames'
import { MenuWrapper } from './MenuWrapper'
import { Button } from '@/components/ui/Button'
import { FormField } from '@/components/ui/FormField'
import { Dropzone } from '@/components/Dropzone'

const triggers = [
  {
    value: 'upload',
    text: 'upload',
    icon: <UploadCloud size={16} />,
  },
  {
    value: 'embed',
    text: 'embed link',
    icon: <Link size={16} />,
  },
]

const schema = createImageCardSchema.omit({ parentBoardId: true })

export const AddImageMenu = () => {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState<string>('')

  const [closeMenu] = useMenu((state) => [state.close])
  const { parentBoardId, redirectToPickBoard } = useParentBoard()

  // TODO-t112: optimistic update
  const { mutate, isPending } = useMutation({
    mutationFn: createCard,
    onError: (error) => toast(error.message),
    onSuccess: () => {
      closeMenu()
      setImageFile(undefined)
      setImageUrl('')
    },
  })

  const onClick = async (type: 'url' | 'file') => {
    let data

    if (type === 'url') {
      if (!imageUrl) return toast('please provide a link')
      if (!(await isImage(imageUrl))) return toast("that's not an image")

      data = {
        type: 'IMAGE',
        image: imageUrl,
      }
    }

    if (type === 'file') {
      if (!imageFile) return toast('please provide a file')

      const imageForm = new FormData()
      imageForm.append('image', imageFile)

      data = {
        type: 'IMAGE',
        image: imageForm,
      }
    }

    const validated = schema.safeParse(data)
    if (!validated.success) return toast('invalid image')

    if (!parentBoardId) return redirectToPickBoard('add', validated.data)

    mutate({
      ...validated.data,
      parentBoardId,
    })
  }

  return (
    <MenuWrapper type='add-image' position='center' closeButton className='p-4'>
      <h3 className='mb-4 text-lg font-bold'>add image</h3>
      <Tabs.Root className='h-full'>
        <Tabs.List className='mb-2 space-x-1'>
          {triggers.map(({ value, text, icon }) => (
            <Tabs.Trigger key={value} value={value} asChild>
              <Button
                variant='subtle'
                className={cn(
                  'bg-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-800 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800',
                  isPending &&
                    'bg-slate-100 data-[state=active]:text-slate-400 data-[state=inactive]:text-slate-400',
                )}
                disabled={isPending}
              >
                {icon}
                {text}
              </Button>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value='upload' className='flex max-h-full flex-col gap-4'>
          <Dropzone
            value={imageFile}
            onChange={(image) => setImageFile(image)}
            disabled={isPending}
          />
          <Button
            onClick={() => onClick('file')}
            disabled={!imageFile || isPending}
            loader={isPending}
          >
            {isPending ? 'uploading image' : 'upload image'}
          </Button>
        </Tabs.Content>
        <Tabs.Content value='embed' className='flex flex-col gap-4'>
          <FormField
            type='url'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={isPending}
            labelText='paste link'
            labelHidden
            className='border-slate-100'
          />
          <Button
            onClick={() => onClick('url')}
            disabled={!imageUrl || isPending}
            loader={isPending}
          >
            {isPending ? 'finding image' : 'embed image'}
          </Button>
        </Tabs.Content>
      </Tabs.Root>
    </MenuWrapper>
  )
}
