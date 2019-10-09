module.exports = {
  plugins: [
    require('postcss-each'),
    require('postcss-conditionals'),
    require('lost'),
    require('postcss-mixins')({
      mixinsFiles: './src/common/styles/mixins/mixins.css'
    }),
    require('postcss-preset-env')({
      stage: 0,
      preserve: false,
      importFrom: [
        './src/common/styles/variables/breakpoints.css',
        './src/common/styles/variables/colors.css',
        './src/common/styles/variables/sizing.css',
        './src/common/styles/variables/spacing.css',
        './src/common/styles/variables/typography.css',
        './src/common/styles/variables/shadows.css'
      ]
    }),
    require('postcss-calc'),
    require('postcss-color-function')
  ]
}
