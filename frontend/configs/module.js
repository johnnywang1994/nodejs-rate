const $vue_loader = require('./loaders/vue-loader');
const $babel_loader = require('./loaders/babel-loader');
const $sass_loader = require('./loaders/sass-loader');
const $pug_loader = require('./loaders/pug-loader');
const $static_loader = require('./loaders/static-loader');

module.exports = function(isProd) {
  return {
    rules: [
      $vue_loader,
      $babel_loader,
      $sass_loader(isProd),
      $pug_loader,
      $static_loader
    ]
  }
}