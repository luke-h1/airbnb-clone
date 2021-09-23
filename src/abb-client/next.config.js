const withImages = require('next-images');

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  withImages,
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  images: {
    domains: [
      'dev-airbnb-clone.s3.eu-west-2.amazonaws.com',
      'prod-airbnb-clone.s3.eu-west-2.amazonaws.com',
      'images.unsplash.com',
    ],
  },
};
