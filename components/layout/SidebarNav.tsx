'use client'

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'
import { cn } from '@/lib/utils'
import { SidebarNavItem } from '@/types/SidebarNavItem'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { Icons } from '../icons'

interface SidebarNavProps {
  setMobileSidebarOpen?: Dispatch<SetStateAction<boolean>>
  user: CustomUser
  items: SidebarNavItem[]
}

export default function SidebarNav({
  setMobileSidebarOpen,
  user,
  items
}: SidebarNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className='grid items-start gap-2'>
      {items.map((item, index) => {
        const Icon = Icons[item.icon || 'arrowRight']
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? '/' : item.href}
              onClick={() => {
                if (setMobileSidebarOpen) setMobileSidebarOpen(false)
              }}
            >
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  path === item.href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                <Icon className='mr-2 h-4 w-4' />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
