// load environment variables from .env
try {
  const dotEnvResult = require('dotenv').config()
  if (dotEnvResult.error) {
    console.log('error loading .env', dotEnvResult.error)
  }
} catch (err) {
  console.log('error loading .env', err)
}

const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const optimizedImages = require('next-optimized-images')
const withOffline = require('next-offline')

const packageJson = require('./package.json')

const nextConfig = {
  /**
   * Runtime configs
   *
   * @see {@url https://github.com/zeit/next.js#exposing-configuration-to-the-server--client-side}
   */
  poweredByHeader: false,
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    ENV: process.env.ENV,
    SITE_DOMAIN: process.env.SITE_DOMAIN,
    ASSET_DOMAIN: process.env.ASSET_DOMAIN,
    API_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL,
    OAUTH_URL: process.env.OAUTH_URL,
    SEGMENT_KEY: process.env.SEGMENT_KEY,
    FB_APP_ID: process.env.FB_APP_ID,
    SENTRY_DSN: process.env.SENTRY_DSN
  },

  /**
   * Build time configs
   */
  pageExtensions: ['tsx'],
  env: {
    app_version: packageJson.version
  },
  useFileSystemPublicRoutes: false,
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
          loader: require('styled-jsx/webpack').loader
        }
      ]
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
  exportPathMap: async function(defaultPathMap) {
    return {
      '/': {
        page: '/_error'
      }
    }
  }
}

module.exports = withPlugins(
  [
    // images
    [
      optimizedImages,
      {
        handleImages: ['jpeg', 'png', 'svg'],
        optimizeImagesInDev: true,
        inlineImageLimit: 1024,
        svgo: {
          plugins: [
            {
              removeViewBox: true
            }
          ]
        },
        svgSpriteLoader: {}
      }
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
            reportFilename: './bundles/server.html'
          },
          browser: {
            analyzerMode: 'static',
            reportFilename: './bundles/client.html'
          }
        }
      }
    ],

    // offline
    [
      withOffline,
      {
        workboxOpts: {
          runtimeCaching: [
            {
              urlPattern: '/',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'homepage-cache'
              }
            },
            {
              urlPattern: new RegExp('/_next/static/'),
              handler: 'CacheFirst',
              options: {
                cacheName: 'static-cache',
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      }
    ]
  ],
  nextConfig
)
