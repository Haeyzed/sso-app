'use client'

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { type getDictionary } from '@/lib/dictionary'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import SidebarNav from './SidebarNav'
import { SidebarNavItems } from '@/constants/data'

interface MobileSidebarProps {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['sidebar']
  user: CustomUser
}

export default function MobileSidebar({
  user,
  dictionary
}: MobileSidebarProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  return (
    <div>
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side='left' className='w-[400px] sm:w-[540px]'>
          <SheetHeader>
            <SheetTitle>{dictionary?.mobile?.title}</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <SidebarNav
            setMobileSidebarOpen={setMobileSidebarOpen}
            user={user}
            items={SidebarNavItems}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
