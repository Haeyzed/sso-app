/** @type {import('next').NextConfig} */
import withPWAInit from '@ducanh2912/next-pwa'

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

export default nextConfig

// export default nextConfig
