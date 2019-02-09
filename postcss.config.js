module.exports = {
  plugins: [
    require('postcss-each'),
    require('postcss-conditionals'),
    require('lost'),
    require('postcss-preset-env')({
      stage: 0
    })
  ]
}
