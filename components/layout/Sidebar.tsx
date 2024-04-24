import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'
import { Locale } from '@/i18n.config'
import { type getDictionary } from '@/lib/dictionary'
import React from 'react'
import { UserNav } from '../user-nav'
import { cn } from '@/lib/utils'

interface SidebarProps {
  user: CustomUser
  dictionary: Awaited<ReturnType<typeof getDictionary>>['sidebar']
}

export default function Sidebar({ user, dictionary }: SidebarProps) {
  return (
    <nav
      className={cn(
        `relative hidden h-screen w-72 border-r bg-card pt-16 lg:block`
      )}
    >
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='space-y-1'>
            <h2 className='mb-2 px-4 text-xl font-semibold tracking-tight'>
              {dictionary?.title}
            </h2>
            {/* <SidebarNav items={sidebarItems} /> */}
          </div>
        </div>
      </div>
    </nav>
  )
}
