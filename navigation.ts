import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation'

export const locales = ['en', 'de', 'yo', 'ig', 'ar', 'zh', 'cs', 'fr'] as const
export const localePrefix = 'always' // Default

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  '/': '/',
  '/login': '/login',
  '/register': '/register',
  '/verify': '/verify',
  '/reset-password': '/reset-password',
  '/change-password': '/change-password',
  '/dashboard': '/dashboard',
  '/user': '/user',
  '/dashboard/location': '/dashboard/location',
  '/dashboard/user/new': '/dashboard/user/new',
  '/dashboard/oauth-client/new': '/dashboard/oauth-client/new',
  '/dashboard/country': '/dashboard/country',
  '/dashboard/country/new': '/dashboard/country/new',
  '/dashboard/state': '/dashboard/state',
  '/dashboard/state/new': '/dashboard/state/new',
  '/dashboard/city': '/dashboard/city',
  '/dashboard/city/new': '/dashboard/city/new'
} satisfies Pathnames<typeof locales>

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    pathnames: pathnames as typeof pathnames & Record<string & {}, string>
  })
