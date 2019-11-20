const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CWD = process.cwd();

module.exports = function(isProd, assetsPrefix) {
  const __HtmlWebpackPluginConfig = {
    template: path.resolve(CWD, './public/index.html'),
    filename: './index.html',
    inject: true,
    minify: isProd
      ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      : false,
  };

  return [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(__HtmlWebpackPluginConfig),
    new MiniCssExtractPlugin({
      filename: `${assetsPrefix}/css/[name].[contenthash].css`,
      chunkFilename: `${assetsPrefix}/css/[id].[contenthash].css`,
    }),
    new VueLoaderPlugin()
  ];
}
