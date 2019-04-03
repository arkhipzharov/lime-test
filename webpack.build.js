const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminWebp = require('imagemin-webp');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = merge(baseConfig, {
  mode: 'production',
  performance: { hints: false },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              url: false
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
            loader: 'url-loader',
            options: {
              limit: 10000,
              context: 'src/',
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      template: 'src/scss/[name].scss'
    }),
    new ImageminPlugin({
      name: '[path][name].[ext]',
      context: 'src/',
      loader: false,
      maxConcurrency: 6,
      imageminOptions: {
        plugins: [
          imageminMozjpeg({
            quality: 100
          }),
          imageminWebp({
            quality: 80
          })
        ]
      },
      exclude: /\.svg$/
    }),
    new CopyPlugin([
      { from: 'src/data', to: 'data/' },
      { from: 'src/fonts', to: 'fonts/' }
    ])
  ]
});
