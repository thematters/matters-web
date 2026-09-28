import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'

import postcssOptions from '../postcss.config.json' with { type: 'json' }

const require = createRequire(import.meta.url)
const dirname = path.dirname(fileURLToPath(import.meta.url))

const isCssRule = (rule) =>
  rule && typeof rule === 'object' && rule.test instanceof RegExp
    ? rule.test.test('.css')
    : false

export default {
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
  ],

  webpackFinal: async (config) => {
    // replace the built-in CSS rules so our PostCSS config is applied
    config.module.rules = config.module.rules.filter((rule) => !isCssRule(rule))
    config.module.rules.push({
      test: /\.css$/,
      sideEffects: true,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          // keep absolute URLs (e.g. /static/fonts) pointing to public/
          options: {
            importLoaders: 1,
            url: { filter: (url) => !url.startsWith('/') },
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            implementation: require.resolve('postcss'),
            postcssOptions,
          },
        },
      ],
    })

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
      '@': path.resolve(dirname, '..'),
      '~': path.resolve(dirname, '../src'),
    }

    return config
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}
