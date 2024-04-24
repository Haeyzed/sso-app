import LanguageToggle from '@/components/language-toggle'
import LocaleSwitcher from '@/components/locale-switcher'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { Locale } from '@/i18n.config'
import { cn } from '@/lib/utils'
import { Globe2 } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
  params: { lang: Locale }
}

export default function AuthLayout({ children, params }: AuthLayoutProps) {
  return (
    <div className='relative bg-background'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'absolute left-0 top-0 ml-4 mt-4'
        )}
      >
        <Globe2 className='h-[1.2rem] w-[1.2rem]' />
      </Link>
      <div className='absolute right-0 top-0 mr-4 mt-4 flex items-center'>
        {/* <LanguageToggle />
        <LocaleSwitcher /> */}
        <ThemeToggle className='' />
      </div>
      {children}
      {/* <LocaleSwitcher />
      <p>Current locale: {params.lang}</p>
      {children} */}
    </div>
  )
}
