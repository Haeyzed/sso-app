import 'server-only' // Import 'server-only' (assuming it's a server-specific module or configuration)

import type { Locale } from '@/i18n.config' // Import type definition for Locale from '@/i18n.config'

// Define dictionaries for different locales using dynamic imports
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default), // Import English dictionary
  de: () => import('@/dictionaries/de.json').then(module => module.default), // Import German dictionary
  cs: () => import('@/dictionaries/cs.json').then(module => module.default), // Import Chinese dictionary
  ar: () => import('@/dictionaries/ar.json').then(module => module.default), // Import Arabic dictionary
  zh: () => import('@/dictionaries/zh.json').then(module => module.default) // Import China dictionary
}

// Async function to fetch and return the dictionary for a specific locale
export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en()
