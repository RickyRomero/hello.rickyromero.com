module.exports = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.[fv]s$/,
      use: 'raw-loader'
    })

    return config
  }
}
