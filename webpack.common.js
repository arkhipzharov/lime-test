const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = {
  entry: {
    index: ['./src/js/index.js', './src/scss/index.scss'],
    cart: ['./src/js/cart.js', './src/scss/cart.scss']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry'
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          { 
            loader: 'html-srcsets-loader',
            options: {
              attrs: ['img:src', 'source:srcset', 'img:srcset']
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              context: 'src/',
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      backbone: ['./backbone/backbone.js', 'default']
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      inject: 'head',
      filename: 'cart.html',
      template: 'src/cart.html',
      chunks: ['cart']
    }),
    new SpriteLoaderPlugin({
      plainSprite: true,
      spriteAttrs: {
        style: 'display: none',
        class: 'svg-sprite'
      }
    }),
    new CopyPlugin([
      { from: 'src/data', to: 'data/' },
      { from: 'src/fonts', to: 'fonts/' }
    ]),
    new HardSourceWebpackPlugin({
      info: {
        mode: 'none',
        level: 'error'
      }
    })
  ]
};
