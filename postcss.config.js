module.exports = {
  plugins: [
    require('@csstools/postcss-global-data')({
      files: ['./src/common/styles/variables/breakpoints.css'],
    }),
    require('postcss-mixins')({
      mixinsFiles: './src/common/styles/mixins.css',
    }),
    require('postcss-preset-env')({
      stage: 0,
      browsers: ['> 0.2% and not dead'],
      preserve: false,
      features: {
        'has-pseudo-class': { preserve: true },
      },
    }),
    require('postcss-calc'),
    require('postcss-color-function'),
  ],
}
