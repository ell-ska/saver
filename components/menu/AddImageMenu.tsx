'use client'

import { useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import * as Tabs from '@radix-ui/react-tabs'
import { Link, UploadCloud } from 'lucide-react'

import { useMenu } from '@/hooks/useMenu'
import { useParentBoard } from '@/hooks/useParentBoard'
import { createCard } from '@/actions/create-card'
import { createImageCardSchema } from '@/lib/schemas'
import { toast } from '@/utils/toast'
import { isImage } from '@/utils/isImage/client'
import { cn } from '@/utils/classnames'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import Dropzone from '@/components/Dropzone'
import MenuWrapper from './MenuWrapper'

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

const AddImageMenu = () => {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState<string>('')

  const [closeMenu] = useMenu((state) => [state.close])
  const { parentBoardId, redirectToPickBoard } = useParentBoard()

  // TODO-t112: optimistic update
  const { execute, status } = useAction(createCard, {
    onError: ({ serverError }) => toast(serverError),
    onSuccess: closeMenu,
  })
  const isLoading = status === 'executing'

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

    execute({
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
                  isLoading &&
                    'bg-slate-100 data-[state=active]:text-slate-400 data-[state=inactive]:text-slate-400',
                )}
                disabled={isLoading}
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
            disabled={isLoading}
          />
          <Button
            onClick={() => onClick('file')}
            disabled={!imageFile || isLoading}
            loader={isLoading}
          >
            {isLoading ? 'uploading image' : 'upload image'}
          </Button>
        </Tabs.Content>
        <Tabs.Content value='embed' className='flex flex-col gap-4'>
          <FormField
            type='url'
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            disabled={isLoading}
            labelText='paste link'
            labelHidden
            className='border-slate-100'
          />
          <Button
            onClick={() => onClick('url')}
            disabled={!imageUrl || isLoading}
            loader={isLoading}
          >
            {isLoading ? 'finding image' : 'embed image'}
          </Button>
        </Tabs.Content>
      </Tabs.Root>
    </MenuWrapper>
  )
}

export default AddImageMenu
