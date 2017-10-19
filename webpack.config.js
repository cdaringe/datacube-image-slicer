var path = require('path')
module.exports = {
  entry: path.resolve(__dirname, 'test', 'index.test.js'),
  output: {
    filename: 'test/index.test.bundle.js'
  },
  node: {
    fs: 'empty'
  }
}
