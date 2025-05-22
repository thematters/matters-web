const path = require('path')
const postcssOptions = require('../postcss.config.json')

module.exports = {
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-mdx-gfm',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            sideEffects: true,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: { importLoaders: 1 },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  implementation: require.resolve('postcss'),
                  postcssOptions,
                },
              },
            ],
          },
        ],
      },
    },
    '@chromatic-com/storybook',
  ],

  webpackFinal: async (config) => {
    // this modifies the existing image rule to exclude .svg files
    // since we want to handle those files with @svgr/webpack
    const imageRule = config.module.rules.find((rule) => {
      if (typeof rule !== 'string' && rule.test instanceof RegExp) {
        return rule.test.test('.svg')
      }
    })
    if (typeof imageRule !== 'string') {
      imageRule.exclude = /\.svg$/
    }

    // configure .svg files to be loaded with @svgr/webpack
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
            outputPath: `static/`,
          },
        },
      ],
    })

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '..'),
      '~': path.resolve(__dirname, '../src'),
    }

    return config
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}
