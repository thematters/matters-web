module.exports = {
  plugins: [
    require('postcss-each'),
    require('postcss-conditionals'),
    require('lost'),
    require('postcss-mixins')({
      mixinsFiles: './common/styles/mixins/mixins.css'
    }),
    require('postcss-preset-env')({
      stage: 0,
      preserve: false,
      importFrom: [
        './common/styles/variables/breakpoints.css',
        './common/styles/variables/colors.css',
        './common/styles/variables/sizing.css',
        './common/styles/variables/spacing.css',
        './common/styles/variables/typography.css'
      ]
    }),
    require('postcss-calc'),
    require('postcss-color-function')
  ]
}
