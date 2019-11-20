const { fromSrc } = require('./fn');

module.exports = function() {
  return {
    extensions: ['.vue', '.js', '.css', '.sass', 'scss', '.jpg', '.png', '.gif'],
    alias: {
      '@': fromSrc('.'),
      '$a': fromSrc('assets'),
      '$c': fromSrc('components')
    }
  }
};
