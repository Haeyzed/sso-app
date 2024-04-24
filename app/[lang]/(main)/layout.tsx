import {
  CustomSession,
  authOptions
} from '@/app/api/auth/[...nextauth]/authOptions'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import LocaleSwitcher from '@/components/locale-switcher'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
  params: { lang: Locale }
}

export default async function MainLayout({
  children,
  params: { lang }
}: MainLayoutProps) {
  const session = (await getServerSession(authOptions)) as CustomSession
  const dictionary = await getDictionary(lang)
  return (
    <div>
      <Header user={session.user!} dictionary={dictionary} />
      <div className='flex h-screen overflow-hidden'>
        <Sidebar user={session.user!} dictionary={dictionary?.sidebar} />
        <main className='w-full pt-16'>{children}</main>
      </div>
    </div>
  )
}
