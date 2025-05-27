const {
  CSP_POLICY,
  SENTRY_CSP_REPORT_GROUP,
  SENTRY_REPORT_URI,
} = require('./configs/csp')

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'
const nextAssetDomain = process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN || ''

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },

  /**
   * Build time configs
   */
  assetPrefix: nextAssetDomain ? `https://${nextAssetDomain}` : undefined,
  pageExtensions: ['tsx'],

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
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

  /**
   * Runtime configs
   *
   */
  reactStrictMode: true,
  compress: false,
  poweredByHeader: false,
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

module.exports = withPWA(withBundleAnalyzer(nextConfig))
