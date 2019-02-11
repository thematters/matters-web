module.exports = {
  plugins: [
    require('postcss-each'),
    require('postcss-conditionals'),
    require('lost'),
    require('postcss-preset-env')({
      stage: 0,
      importFrom: [
        './common/styles/variables/breakpoints.css',
        './common/styles/variables/colors.css',
        './common/styles/variables/sizing.css',
        './common/styles/variables/spacing.css',
        './common/styles/variables/typography.css'
      ]
    })
  ]
}
