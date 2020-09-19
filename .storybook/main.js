const tsconfig = require('../tsconfig.json')
const path = require('path')
const { mergeWithCustomize } = require('webpack-merge')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  /*
    Next.js automatically supports the tsconfig.json "paths" and "baseUrl"
    options but the webpack configuration of Storybook doesn't yet.
    Also need to keep the same effect from `next.config.js` for loaders or plugins of webpack.
  */
  webpackFinal(config) {
    config.module.rules = config.module.rules.filter(
      (it) => it.test && it.test.toString() !== '/\\.css$/'
    )
    const newConfig = mergeWithCustomize({
      customizeArray(a, b, key) {
        if (key === 'module.rules') {
          return b.concat(a)
        }
      },
    })(
      config,
      {
        module: {
          rules: [
            {
              test: /\.svg$/,
              use: [
                {
                  loader: '@svgr/webpack',
                  options: {
                    memo: true,
                    dimensions: false,
                  },
                },
              ],
            },
            {
              test: /\.css$/,
              use: [
                'babel-loader',
                {
                  loader: require('styled-jsx/webpack').loader,
                },
              ],
            },
          ],
        },
      },
      {
        resolve: {
          alias: Object.entries(tsconfig.compilerOptions.paths)
            /*
              @see https://webpack.js.org/configuration/resolve/#resolvealias
             */
            .map((pair) => [
              pair[0].replace('/*', ''),
              path.join(
                path.dirname(require.resolve('../tsconfig.json')),
                tsconfig.compilerOptions.baseUrl,
                pair[1][0].replace('/*', '')
              ),
            ])
            .reduce(
              (acc, [key, value]) => Object.assign(acc, { [key]: value }),
              {}
            ),
        },
      }
    )
    return newConfig
  },
  /*
    make the components' PropTypes interface works for argTypes of storybook
  */
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      // @see https://github.com/storybookjs/storybook/issues/11019#issuecomment-656776919
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
}
