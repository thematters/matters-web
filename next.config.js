const withPlugins = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withSize = require('next-size')

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
          loader: require('styled-jsx/webpack').loader,
          options: {
            type: 'scoped'
          }
        }
      ]
    })

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
