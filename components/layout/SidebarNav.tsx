'use client'

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'
import { Dispatch, SetStateAction } from 'react'

interface SidebarNavProps {
  setMobileSidebarOpen?: Dispatch<SetStateAction<boolean>>
  user: CustomUser
}

export default function SidebarNav({
  setMobileSidebarOpen,
  user
}: SidebarNavProps) {
  return <div>SidebarNav</div>
}
