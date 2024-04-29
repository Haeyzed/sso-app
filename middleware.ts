// Add the next-auth middleware export
// export { default } from 'next-auth/middleware'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'de', 'yo', 'ig', 'ar', 'zh', 'cs', 'fr'],

  // Used when no locale matches
  defaultLocale: 'en'
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|cs|zh|ar|ig|yo|de|en)/:path*']
}
