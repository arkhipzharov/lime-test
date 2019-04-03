const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
module.exports = merge(baseConfig, {
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'fast-sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'src/',
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  }
});
