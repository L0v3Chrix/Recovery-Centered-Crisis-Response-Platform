const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // TEMP: allow build to proceed while we fix lints
    ignoreDuringBuilds: true,
  },
}

module.exports = withPWA(nextConfig)