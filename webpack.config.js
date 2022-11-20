const { resolve } = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dist')
  },
  mode: 'development'
}