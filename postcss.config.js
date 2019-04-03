module.exports = (ctx) => {
  const config = {
    syntax: 'postcss-scss',
    plugins: {
      'postcss-import': {}
    }
  };
  if (ctx.env === 'production') {
    config.plugins['postcss-preset-env'] = {};
    config.plugins.cssnano = {};
  }
  return config;
};
