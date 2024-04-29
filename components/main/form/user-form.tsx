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
import { Plus } from 'lucide-react'
import { useState } from 'react'
import FormComponent from './form'
import { Dispatch, SetStateAction } from 'react'
import { useTranslations } from 'next-intl'

export function UserForm() {
  const t = useTranslations('')
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='default' size='sm'>
            <Plus className='mr-2 h-4 w-4' /> Add New
          </Button>
        </DialogTrigger>
        <DialogContent className='grid gap-6 bg-card sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when youre done.
            </DialogDescription>
          </DialogHeader>
          <Form setOpen={setOpen} isDesktop={isDesktop} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='default' size='sm'>
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
        <Form className='px-4' setOpen={setOpen} />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function Form({
  className,
  setOpen,
  isDesktop
}: {
  className?: string
  setOpen: Dispatch<SetStateAction<boolean>>
  isDesktop?: boolean
}) {
  return (
    <FormComponent
      className={className}
      setOpen={setOpen}
      isDesktop={isDesktop}
    />
  )
}
