const withPlugins = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withSize = require('next-size')
const optimizedImages = require('next-optimized-images')

const nextConfig = {
  useFileSystemPublicRoutes: false,
  distDir: 'build',
  webpack(config, { defaultLoaders }) {
    /**
     * Styles in regular CSS files
     * https://github.com/zeit/styled-jsx#styles-in-regular-css-files
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
