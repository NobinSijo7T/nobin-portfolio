/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack for development to fix font loading issues
  // Remove --turbo flag from dev script or use webpack instead
  
  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Production optimizations
  productionBrowserSourceMaps: false,
  
  // Power by header removal
  poweredByHeader: false,
  
  // ETag headers for caching
  generateEtags: true,
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // React strict mode disabled in production for performance
  reactStrictMode: false,
  
  // Bundle analyzer (uncomment to analyze bundle)
  // bundleAnalyzer: {
  //   analyzerMode: 'static',
  // },
}

module.exports = nextConfig