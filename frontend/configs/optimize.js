const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = function() {
  return {
    splitChunks: { chunks: 'all' },
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new TerserJSPlugin({})
    ]
  }
}