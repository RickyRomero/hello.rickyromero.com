require('dotenv').config()

module.exports = {
  env: {
    BASEURL: `${process.env.SCHEME}${process.env.HOST}`,
    LENS_BASEURL: `${process.env.LENS_SCHEME}${process.env.LENS_HOST}`
  },
  reactStrictMode: true,
  images: {
    imageSizes: [240, 480],
    deviceSizes: [640, 800, 1280, 1920, 2560, 3840, 5120, 6016],
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
