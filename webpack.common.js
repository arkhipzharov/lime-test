const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[hash].js',
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    plugins: [
      new DirectoryNamedWebpackPlugin(true),
    ],
    alias: {
      // Для работоспособности v-runtime-template
      vue$: 'vue/dist/vue.common',
      /*
        import '@/path/file.ext';

        вместо import '../../../src/path/file.ext';
      */
      '@': path.resolve(__dirname, 'src/'),
    },
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
              // import('./file.ext');
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
              ],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    /* 1
                      Теперь надо указывать версию corejs, подробнее:

                      https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md
                    */
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              /*
                <span>
                  Многострочный текст
                </span>
                =>
                <span> Многострочный текст</span>

                Появлялся нежелательный пробел в начале текста
              */
              whitespace: 'condense',
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new SpriteLoaderPlugin({
        // Упрощенная версия svg спрайта в бандле
      plainSprite: true,
      spriteAttrs: {
          // Svg спрайт занимал много места в макете и ломал его
        style: 'display: none;',
      },
    }),
    new VueLoaderPlugin(),
  ],
};
