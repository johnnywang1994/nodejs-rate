const path = require('path');
const CWD = process.cwd();
const fromSrc = (dir) => path.join(CWD, 'src', dir);

module.exports = {
  test: /\.js$/i,
  loader: 'babel-loader',
  exclude: /node_modules/,
  include: [fromSrc('.')],
};