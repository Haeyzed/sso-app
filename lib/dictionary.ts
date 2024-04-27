import 'server-only'
import type { Locale } from '@/i18n.config'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  de: () => import('@/dictionaries/de.json').then(module => module.default),
  cs: () => import('@/dictionaries/cs.json').then(module => module.default),
  ar: () => import('@/dictionaries/ar.json').then(module => module.default),
  zh: () => import('@/dictionaries/zh.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en()
