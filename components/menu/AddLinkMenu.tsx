import FormField from '@/components/ui/FormField'
import Button from '@/components/ui/Button'
import MenuWrapper from './MenuWrapper'

const AddLinkMenu = () => {
  // TODO: run create link card action

  return (
    <MenuWrapper type='add-link' position='center' closeButton className='p-4'>
      <h3 className='mb-4 text-lg font-bold'>add link</h3>
      <form className='flex flex-col gap-4'>
        <FormField type='url' labelText='paste link' placeholder='paste link' />
        <Button type='submit'>add link</Button>
      </form>
    </MenuWrapper>
  )
}

export default AddLinkMenu
