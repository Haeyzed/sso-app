import LocaleSwitcher from '@/components/locale-switcher'
import { Locale } from '@/i18n.config'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  params: { lang: Locale }
}

export default function layout({ children, params }: LayoutProps) {
  return (
    <>
      {/* <LocaleSwitcher />
      <p>Current locale: {params.lang}</p> */}
      {children}
    </>
  )
}
