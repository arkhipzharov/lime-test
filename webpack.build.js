const CopyPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
/* 1
  Используется расширение для редактора, из-за которого код внутри вызова
  функции выделяется одним цветом, вследствие чего комментарии сливаются с кодом
  при нахождении на одном уровне по отступам. По этой причине комментарии
  отделяются двумя пробелами от основного содержимого в таких областях, а также
  в областях, где будет наблюдаться такая же ситуация, например в вызове
  конструктора
*/
module.exports = merge(baseConfig, {
    // Показывалось предупреждение о превышенном размере js и css файлов
    // в бандле
  performance: { hints: false },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
          'fast-sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
                // Сделать содержимое этих файлов доступным для каждого SFC
                // без их импорта
              resources: [
                './src/scss/helpers/variables.scss',
                './src/scss/helpers/functions/*.scss',
                './src/scss/helpers/mixins/*.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                // Файлы находились не в той папке в бандле
              context: 'src/',
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpg|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              context: 'src/',
              name: '[path][name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
                // Добавляет отдельный файл svg спрайта в бандл
              extract: true,
            },
          },
          {
              // Минификатор
            loader: 'svgo-loader',
            options: {
              externalConfig: 'svgo.config.yml',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.[hash].css',
    }),
      // JSON файлы статичные
    new CopyPlugin([
      { from: 'src/data', to: 'data/' },
    ]),
      // Только этот плагин может минифицировать изображения, заинлайненные url
      // загрузчиком
    new ImageminPlugin({
        // Контролировать только эти форматы, тем самым исключив svg,
        // поскольку им занимается svgo-loader
      test: /\.(jpg|webp)$/i,
      name: '[path][name].[ext]',
      context: 'src/',
      imageminOptions: {
        plugins: [
            // Картинки товаров на главной странице уже сжаты, так что это по
            // большей части просто демонстрация использования минификатора
          imageminMozjpeg({
            quality: 100,
          }),
          imageminWebp({
            quality: 70,
          }),
        ],
      },
    }),
    new CleanWebpackPlugin(),
  ],
});
