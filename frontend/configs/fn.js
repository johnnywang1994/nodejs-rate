const path = require('path');
const CWD = process.cwd();

module.exports.fromSrc = function(dir) {
  return path.join(CWD, 'src', dir);
}
