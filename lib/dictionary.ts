import 'server-only'; // Import 'server-only' (assuming it's a server-specific module or configuration)

import type { Locale } from '@/i18n.config'; // Import type definition for Locale from '@/i18n.config'

// Define dictionaries for different locales using dynamic imports
const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default), // Import English dictionary
  de: () => import('@/dictionaries/de.json').then(module => module.default), // Import German dictionary
  cn: () => import('@/dictionaries/cn.json').then(module => module.default)  // Import Chinese dictionary
};

// Async function to fetch and return the dictionary for a specific locale
export const getDictionary = async (locale: Locale) => dictionaries[locale]();
