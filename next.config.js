/**
 * @type {import('next').NextConfig}
 */

const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withOffline = require('next-offline')

const packageJson = require('./package.json')

const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'
const isStatic = process.env.NEXT_PUBLIC_BUILD_TYPE === 'static'
const nextAssetDomain = process.env.NEXT_PUBLIC_NEXT_ASSET_DOMAIN || ''

const nextConfig = {
  /**
   * Build time configs
   */
  assetPrefix: nextAssetDomain ? `https://${nextAssetDomain}` : undefined,
  pageExtensions: ['tsx'],
  swcMinify: false,
  crossOrigin: 'anonymous',

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

  // filter out server side path for static export
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    const excludePath = ['oauth', 'pay']

    const filtered = Object.keys(defaultPathMap)
      .filter((key) => !excludePath.includes(key.split('/')[1]))
      .reduce((obj, key) => {
        obj[key] = defaultPathMap[key]
        return obj
      }, {})
    return filtered
  },

  /**
   * Runtime configs
   *
   */
  compress: false,
  poweredByHeader: false,
  i18n: {
    locales: ['zh-Hant', 'zh-Hans', 'en', '__defaultLocale'],
    // FIXME: Disable Next.js auto detection and prefixing since we have a fallback strategy based on user request and browser perference in `<LanguageContext>`
    defaultLocale: '__defaultLocale',
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

let plugins = [
  // bundle analyzer
  [withBundleAnalyzer],
]

if (!isStatic) {
  plugins = [
    ...plugins,
    // offline
    [
      withOffline,
      {
        // FIXME: https://github.com/hanford/next-offline/issues/195
        generateInDevMode: false,
        workboxOpts: {
          swDest: '../public/service-worker.js',
          runtimeCaching: [
            {
              urlPattern: '/',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'homepage-cache',
              },
            },
            {
              urlPattern: new RegExp('/_next/static/'),
              handler: 'CacheFirst',
              options: {
                cacheName: 'static-cache',
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
      },
    ],
  ]
}

module.exports = withPlugins(plugins, nextConfig)
