/** @type {import('next').NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa'
import createNextIntlPlugin from 'next-intl/plugin'
const withNextIntl = createNextIntlPlugin()

const withPWA = withPWAInit({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true
  }
})

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: '*',
        protocol: 'https'
      },
      {
        hostname: 'localhost',
        protocol: 'http'
      }
    ]
  },
  reactStrictMode: false
}

export default withNextIntl(nextConfig)

// export default nextConfig
