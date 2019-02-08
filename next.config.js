const withPlugins = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withSize = require('next-size')

const nextConfig = {
  useFileSystemPublicRoutes: false,
  webpack(config, options) {
    return config
  }
}

module.exports = withPlugins(
  [
    // TypeScript
    withTypescript,

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
