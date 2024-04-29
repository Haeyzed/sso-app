'use client'
import React, { useTransition } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useTranslations, useLocale } from 'next-intl'
import { locales, usePathname, useRouter } from '@/navigation'

interface LanguageToggleProps {
  className?: string
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className
}) => {
  const router = useRouter()
  const t = useTranslations('language')
  const locale = useLocale()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleChangeLocale = (nextLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <div className={className}>
      <Select
        defaultValue={locale}
        onValueChange={handleChangeLocale}
        disabled={isPending}
      >
        <SelectTrigger className='w-[150px]'>
          <SelectValue placeholder='Language' />
        </SelectTrigger>
        <SelectContent>
          {locales.map(locale => (
            <SelectItem key={locale} value={locale}>
              {t('locale', { locale: locale })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
