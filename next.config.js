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
const withTypescript = require('@zeit/next-typescript')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withSize = require('next-size')
const optimizedImages = require('next-optimized-images')
const ASSET_PREFIX = process.env.ASSET_PREFIX

const nextConfig = {
  /**
   * Runtime configs
   *
   * @see {@url https://github.com/zeit/next.js#exposing-configuration-to-the-server--client-side}
   */
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    SITE_DOMIAN: process.env.SITE_DOMIAN,
    API_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL,
    SEGMENT_KEY: process.env.SEGMENT_KEY
  },

  /**
   * Build time configs
   */
  env: {},
  // note: "assetPrefix" is in build time, we use dynamic assetPrefix in "server.ts"
  // @see {@url https://github.com/zeit/next.js#dynamic-assetprefix}
  // assetPrefix: isProd && process.env.ASSET_PREFIX ? process.env.ASSET_PREFIX : '',
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
    config.module.rules.push({
      test: /\.xml$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: `${ASSET_PREFIX}/_next/static/`,
            outputPath: `${isServer ? '../' : ''}static/`,
            name: '[name]-[hash].[ext]'
          }
        }
      ]
    })

    return config
  },
  exportPathMap: async function(defaultPathMap) {
    return {
      '/': { page: '/_error' }
    }
  }
}

module.exports = withPlugins(
  [
    // TypeScript
    withTypescript,

    // images
    [
      optimizedImages,
      {
        handleImages: ['jpeg', 'png', 'svg'],
        optimizeImagesInDev: true,
        inlineImageLimit: 1024,
        svgo: {
          plugins: [{ removeViewBox: true }]
        },
        svgSpriteLoader: {}
      }
    ],

    // output build size
    withSize,

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
    ]
  ],
  nextConfig
)
