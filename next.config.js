module.exports = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(?:vert|frag)$/,
      use: [
        'raw-loader',
        {
          loader: 'glslify-loader',
          options: {
            basedir: process.env.NODE_PATH
          }
        }
      ]
    })

    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })

    return config
  }
}
