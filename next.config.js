/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io', 'i.imgur.com', 'res.cloudinary.com'],
  },
  // Allow serving uploaded files from /public/uploads
  async headers() {
    return [
      {
        source: '/uploads/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000' }],
      },
    ]
  },
}

module.exports = nextConfig
