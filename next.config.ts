import type { NextConfig } from 'next'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'
const nextAssetDomain = process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN || ''

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['wagmi'],
  },
  poweredByHeader: false,
  assetPrefix: nextAssetDomain ? `https://${nextAssetDomain}` : undefined,

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                  {
                    name: 'removeDimensions',
                    active: true,
                  },
                  {
                    name: 'prefixIds',
                    active: true,
                  },
                ],
              },
            },
          },
        ],
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: isLocal,
  register: true,
  sw: 'service-worker.js',
  runtimeCaching: [], // disable runtime caching
  publicExcludes: ['!static/**/*'],
  buildExcludes: [/.*\.svg/],
  cacheStartUrl: false,
  dynamicStartUrl: true,
})

export default withPWA(withBundleAnalyzer(nextConfig))
