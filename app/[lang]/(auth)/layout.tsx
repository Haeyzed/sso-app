import LocaleSwitcher from '@/components/locale-switcher'
import { Locale } from '@/i18n.config'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  params: { lang: Locale }
}

export default function AuthLayout({ children, params }: AuthLayoutProps) {
  return (
    <div className='bg-background'>
      {/* <LocaleSwitcher />
      <p>Current locale: {params.lang}</p> */}
      {children}
    </div>
  )
}
