import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/use-media-query'
import { type getDictionary } from '@/lib/dictionary'
import { Plus } from 'lucide-react'
import FormComponent from './form'
import { Dispatch, SetStateAction, useState } from 'react'

export function UserForm({
  dictionary
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>
}) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='default'>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </DialogTrigger>
        <DialogContent className='bg-card sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm dictionary={dictionary?.register} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='default'>
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </DrawerTrigger>
      <DrawerContent className='bg-card'>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Add User</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when youre done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className='px-4' dictionary={dictionary?.register} />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({
  dictionary,
  className,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['register']
  className?: string
}) {
  return <FormComponent dictionary={dictionary} className={className} />
}
