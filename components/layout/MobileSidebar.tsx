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
        <SheetContent side='left'>
          <SheetHeader>
            <SheetTitle>{dictionary?.mobile?.title}</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
