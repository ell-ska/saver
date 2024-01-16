import * as Tabs from '@radix-ui/react-tabs'
import { Link, UploadCloud } from 'lucide-react'

import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
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

const AddImageMenu = () => {
  return (
    <MenuWrapper type='add-image' position='center' closeButton className='p-4'>
      <h3 className='mb-4 text-lg font-bold'>add image</h3>
      <Tabs.Root>
        <Tabs.List className='mb-2 space-x-1 pl-2'>
          {triggers.map(({ value, text, icon }) => (
            <Tabs.Trigger key={value} value={value} asChild>
              <Button
                variant='subtle'
                className='bg-slate-200 text-slate-400 hover:bg-slate-100 hover:text-slate-800 data-[state=active]:bg-slate-100 data-[state=active]:text-slate-800'
              >
                {icon}
                {text}
              </Button>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value='upload'>dropzone</Tabs.Content>
        <Tabs.Content value='embed'>
          <form className='flex flex-col gap-4'>
            <FormField
              type='url'
              labelText='paste link'
              labelHidden
              className='border-slate-100'
            />
            <Button type='submit'>embed image</Button>
          </form>
        </Tabs.Content>
      </Tabs.Root>
    </MenuWrapper>
  )
}

export default AddImageMenu
