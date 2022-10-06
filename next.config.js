const withMarkdoc = require('@markdoc/next.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/documentation',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md'],
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
}

module.exports = withMarkdoc()(nextConfig)
