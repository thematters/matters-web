import { withSentryConfig } from '@sentry/nextjs'
import type { NextConfig } from 'next'

import packageJson from '@/package.json'

import {
  CSP_POLICY,
  SENTRY_CSP_REPORT_GROUP,
  SENTRY_REPORT_URI,
} from './configs/csp'

const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'
const nextAssetDomain = process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN || ''

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['wagmi'],
  },
  poweredByHeader: false,
  assetPrefix: nextAssetDomain ? `https://${nextAssetDomain}` : undefined,

  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: CSP_POLICY,
          },
          {
            key: 'Report-To',
            value: `{"group":"${SENTRY_CSP_REPORT_GROUP}","max_age":10886400,"endpoints":[{"url":"${SENTRY_REPORT_URI}"}],"include_subdomains":true}`,
          },
          {
            key: 'Reporting-Endpoints',
            value: `${SENTRY_CSP_REPORT_GROUP}="${SENTRY_REPORT_URI}"`,
          },
        ],
      },
    ]
  },

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

export default withSentryConfig(withPWA(withBundleAnalyzer(nextConfig)), {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.SENTRY_AUTH_TOKEN,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  reactComponentAnnotation: {
    enabled: true,
  },

  unstable_sentryWebpackPluginOptions: {
    applicationKey: packageJson.name,
  },
})
