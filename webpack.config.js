const { basename } = require('path');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    foo: './src/foo.js',
    bar: './src/bar.js',
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new htmlPlugin({ title: basename(__dirname) })],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name(module, chunks, cacheGroupKey) {
        const moduleFileName = module
          .identifier()
          .split('/')
          .reduceRight((item) => item);

        const allChunksNames = chunks.map((item) => item.name).join('~');
        // 可以选择拼接 cacheGroupKey 也可以不拼接，甚至 allChunksNames 也可以不需要
        // `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`
        // slice 可以得到这样更容易让人接受的文件名 react.development.js
        return moduleFileName.slice(0, -3);
      },
    }
  },
  mode: 'development'
}