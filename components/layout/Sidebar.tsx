import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import React from 'react'
import { UserNav } from '../user-nav'

interface SidebarProps {
  user: CustomUser
  params: { lang: Locale }
}

export default async function Sidebar({
  user,
  params: { lang }
}: SidebarProps) {
  const dictionary = await getDictionary(lang)
  return <div>Sidebar</div>
}
