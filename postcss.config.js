module.exports = {
  plugins: [
    [
      '@csstools/postcss-global-data',
      {
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
      },
    ],
    [
      'postcss-mixins',
      {
        mixinsFiles: './src/common/styles/mixins.css',
      },
    ],
    [
      'postcss-preset-env',
      {
        stage: 0,
        browsers: ['> 0.2% and not dead'],
        preserve: false,
        features: {
          'has-pseudo-class': { preserve: true },
        },
      },
    ],
    'postcss-calc',
    'postcss-color-function',
  ],
}
