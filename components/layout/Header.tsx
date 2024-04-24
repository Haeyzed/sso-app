import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import React from 'react'
import { UserNav } from '../user-nav'

interface HeaderProps {
  user: CustomUser
  params: { lang: Locale }
}

export default async function Header({ user, params: { lang } }: HeaderProps) {
  const dictionary = await getDictionary(lang)
  return (
    <div>
      <UserNav user={user} dictionary={dictionary?.userNav} />
    </div>
  )
}
