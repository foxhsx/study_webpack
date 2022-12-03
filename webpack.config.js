const { basename, resolve } = require('path');
const htmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const postcssPresetEnv = require('postcss-preset-env');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: {
    foo: './src/foo.js',
    bar: './src/bar.js'
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // chunkFilename: '[id].css'
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
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
        // 最终生成的名称 moduleFileName + .js，这也是为啥要写 slice 的原因 - react.development.js.js
        return moduleFileName.slice(0, -3);
      },
    },
    runtimeChunk: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
    minimize: true
  },
  mode: 'development'
}