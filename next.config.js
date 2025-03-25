const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const isLocal = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'local'
const nextAssetDomain = process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN || ''

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /**
   * Build time configs
   */
  assetPrefix: nextAssetDomain ? `https://${nextAssetDomain}` : undefined,
  pageExtensions: ['tsx'],

  webpack(config, { defaultLoaders, isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
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
        {
          loader: 'url-loader',
          options: {
            limit: 1024,
            publicPath: nextAssetDomain
              ? `https://${nextAssetDomain}/_next/static/`
              : '/_next/static/',
            outputPath: `${isServer ? '../' : ''}static/`,
          },
        },
      ],
    })

    return config
  },

  /**
   * Runtime configs
   *
   */
  reactStrictMode: true,
  compress: false,
  poweredByHeader: false,
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: isLocal,
  register: true,
  sw: 'service-worker.js',
  // runtimeCaching: [], // disable runtime caching
  publicExcludes: ['!static/**/*'],
  buildExcludes: [/.*\.svg/],
  cacheStartUrl: true,
  dynamicStartUrl: true,
})

module.exports = withPWA(withBundleAnalyzer(nextConfig))
