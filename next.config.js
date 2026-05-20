/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable Turbopack for development to fix font loading issues
  // Remove --turbo flag from dev script or use webpack instead
  
  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Lower quality for mobile to reduce bandwidth
    qualities: [60, 75, 90],
    minimumCacheTTL: 60,
    // Enable lazy loading by default
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
  
  // Compression
  compress: true,
  
  // Optimize for mobile
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['gsap', 'three', 'framer-motion'],
  },
  
  // Bundle analyzer (uncomment to analyze bundle)
  // bundleAnalyzer: {
  //   analyzerMode: 'static',
  // },
}

module.exports = nextConfig