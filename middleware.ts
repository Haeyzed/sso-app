export { default as nextAuthMiddleware } from 'next-auth/middleware'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en', 'de', 'yo', 'ig', 'ar', 'zh', 'cs', 'fr'],
  defaultLocale: 'en'
})

export const config = {
  matcher: ['/', '/profile', '/(fr|cs|zh|ar|ig|yo|de|en)/:path*']
}
