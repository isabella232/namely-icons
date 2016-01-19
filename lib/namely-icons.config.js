var package = require('../package.json');
var version = package.version;

var filename = `namely-icons-${version.replace(/\./g,'_')}`;
var filePath = process.env.NODE_ENV === "production" ? "https://dzmqh46i6l1ir.cloudfront.net/public/" : "/fonts/";

module.exports = {
  version: version,
  filename: filename,
  path: filePath,
  fullPath: `${filePath}${filename}`,
};
