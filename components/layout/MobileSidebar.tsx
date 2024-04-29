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
import { SidebarNavItems } from '@/constants/data'
import { MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import SidebarNav from './SidebarNav'

interface MobileSidebarProps {
  user: CustomUser
}

export default function MobileSidebar({
  user
}: MobileSidebarProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const t = useTranslations('sidebar')
  return (
    <div>
      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side='left' className='w-[400px] sm:w-[540px]'>
          <SheetHeader>
            <SheetTitle>{t('mobile.title')}</SheetTitle>
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
