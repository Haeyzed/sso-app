import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Globe2 } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='relative min-h-screen bg-background'>
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
        <LanguageToggle />
        <ThemeToggle />
      </div>
      {children}
    </div>
  )
}
