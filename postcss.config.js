const postcssGlobalData = require('@csstools/postcss-global-data')
const postcssCalc = require('postcss-calc')
const postcssColorFunction = require('postcss-color-function')
const poostcssMixins = require('postcss-mixins')
const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: [
    postcssGlobalData({
      files: [
        './src/common/styles/variables/breakpoints.css',
        './src/common/styles/variables/layouts.css',
        // './src/common/styles/variables/colors.css',
        // './src/common/styles/variables/sizing.css',
        // './src/common/styles/variables/z-index.css',
        // './src/common/styles/variables/spacing.css',
        // './src/common/styles/variables/typography.css',
        // './src/common/styles/variables/shadows.css',
      ],
    }),
    poostcssMixins({
      mixinsFiles: './src/common/styles/mixins.css',
    }),
    postcssPresetEnv({
      stage: 0,
      browsers: ['> 0.2% and not dead'],
      preserve: false,
      features: {
        'has-pseudo-class': { preserve: true },
      },
    }),
    postcssCalc(),
    postcssColorFunction(),
  ],
}
