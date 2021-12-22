module.exports = {
  plugins: {
    'postcss-pxtorem': {
      propList: [
        'font',
        'font-size',
        'line-height',
        'letter-spacing',
        '--*'
      ]
    },
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false
      }
    },
    'postcss-camel-case': {}
  }
}
