import {
  CustomSession,
  authOptions
} from '@/app/api/auth/[...nextauth]/authOptions'
import Header from '@/components/layout/Header'
import LocaleSwitcher from '@/components/locale-switcher'
import { Locale } from '@/i18n.config'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
  params: { lang: Locale }
}

export default async function MainLayout({
  children,
  params
}: MainLayoutProps) {
  const session = (await getServerSession(authOptions)) as CustomSession
  return (
    <>
      <Header user={session.user!} params={params} />
      {/* <LocaleSwitcher />
      <p>Current locale: {params.lang}</p> */}
      {children}
    </>
  )
}
