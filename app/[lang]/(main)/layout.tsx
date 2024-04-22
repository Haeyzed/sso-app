import LocaleSwitcher from '@/components/locale-switcher'
import { Locale } from '@/i18n.config'
import { ReactNode } from 'react'

interface MainLayoutProps {
  children: ReactNode
  params: { lang: Locale }
}

export default function MainLayout({ children, params }: MainLayoutProps) {
  return (
    <>
      <LocaleSwitcher />
      <p>Current locale: {params.lang}</p>
      {children}
    </>
  )
}
