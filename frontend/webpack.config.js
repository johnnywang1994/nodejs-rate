const path = require('path');
const ora = require('ora');
const { fromSrc } = require('./configs/fn');

const $module = require('./configs/module');
const $plugins = require('./configs/plugins');
const $optimize = require('./configs/optimize');
const $resolve = require('./configs/resolve');
const $dev_server = require('./configs/dev-server');

module.exports = (env, argv) => {
  const spinner = ora('Webpack running in mode: ' + argv.mode).start();
  const $NODE_ENV = argv.mode;
  const isProd = $NODE_ENV === 'production';
  const assetsPrefix = 'static';
  setTimeout(() => spinner.succeed(), 3000);

  return {
    entry: fromSrc('main.js'),
    devtool: isProd ? false : 'source-map',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `${assetsPrefix}/js/${
        isProd ? '[name].[contenthash].js' : '[name].js'
      }`,
      publicPath: '/'
    },
    module: $module(isProd),
    plugins: $plugins(isProd, assetsPrefix),
    optimization: $optimize(),
    resolve: $resolve(),
    devServer: $dev_server
  }
}
