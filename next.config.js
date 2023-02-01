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
    /**
     * Styles in regular CSS files
     * @see {@url https://github.com/zeit/styled-jsx#styles-in-regular-css-files}
     */
    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require('styled-jsx/webpack').loader,
        },
      ],
    })
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
            publicPath: '/_next/static/',
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
  i18n: {
    locales: ['zh-Hant', 'zh-Hans', 'en', '__defaultLocale'],
    // FIXME: Disable Next.js auto detection and prefixing since we have a fallback strategy based on user request and browser perference in `<LanguageContext>`
    defaultLocale: 'en',
    localeDetection: false,
  },

  // custom HTTP headers
  async headers() {
    return [
      {
        source: '/:path*',
        has: !isProd
          ? undefined
          : [
              {
                type: 'host',
                value: process.env.NEXT_PUBLIC_OAUTH_SITE_DOMAIN,
              },
            ],
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
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
  publicExcludes: ['!static/**/*'],
  buildExcludes: [/.*\.svg/],
  cacheStartUrl: false,
  dynamicStartUrl: true,
})

module.exports = withPWA(withBundleAnalyzer(nextConfig))
