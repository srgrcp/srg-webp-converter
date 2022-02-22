/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
  },
  assetPrefix: '.',
}

module.exports = nextConfig
