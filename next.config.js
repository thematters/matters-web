const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const optimizedImages = require('next-optimized-images')
const withOffline = require('next-offline')

const packageJson = require('./package.json')

const isProd = process.env.NODE_ENV === 'production'

const URL_PUSH_SW = isProd
  ? './firebase-messaging-sw-production.js'
  : './firebase-messaging-sw-develop.js'

const nextConfig = {
  /**
   * Runtime configs
   *
   * @see {@url https://github.com/zeit/next.js#exposing-configuration-to-the-server--client-side}
   */
  poweredByHeader: false,

  /**
   * Build time configs
   */
  pageExtensions: ['tsx'],
  env: {
    APP_VERSION: packageJson.version,
  },
  useFileSystemPublicRoutes: false,
  typescript: {
    ignoreDevErrors: true,
  },
  distDir: 'build',
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
          options: {
            memo: true,
            dimensions: false,
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

    /***
     * Import files as URL
     */
    // config.module.rules.push({
    //   test: /\.xml$/,
    //   use: [
    //     {
    //       loader: 'file-loader',
    //       options: {
    //         publicPath: '/_next/static/',
    //         outputPath: `${isServer ? '../' : ''}static/`,
    //         name: '[name]-[hash].[ext]'
    //       }
    //     }
    //   ]
    // })

    return config
  },
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': {
        page: '/_error',
      },
    }
  },
}

module.exports = withPlugins(
  [
    // images
    [
      optimizedImages,
      {
        handleImages: ['jpeg', 'png'],
        optimizeImagesInDev: true,
        inlineImageLimit: 1024,
      },
    ],

    // bundle analyzer
    [
      withBundleAnalyzer,
      {
        analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ['browser', 'both'].includes(
          process.env.BUNDLE_ANALYZE
        ),
        bundleAnalyzerConfig: {
          server: {
            analyzerMode: 'static',
            reportFilename: './bundles/server.html',
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: './bundles/client.html',
          },
        },
      },
    ],

    // offline
    [
      withOffline,
      {
        // FIXME: https://github.com/hanford/next-offline/issues/195
        generateInDevMode: false,
        workboxOpts: {
          // https://github.com/hanford/next-offline/issues/35
          importScripts: [URL_PUSH_SW],
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
  ],
  nextConfig
)
