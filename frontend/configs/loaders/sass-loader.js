const path = require('path');
const CWD = process.cwd();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function(isProd) {
  return {
    test: /\.(sc|c)ss$/i,
    use: [
      isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [
              path.resolve(CWD, 'src/styles'),
              path.resolve(CWD, 'node_modules'),
            ],
          },
          prependData: `
            @import "variables.scss";
            @import "mixin.scss";
          `,
        }
      }
    ]
  }
}