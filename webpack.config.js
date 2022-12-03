const { basename, resolve } = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const postcssPresetEnv = require('postcss-preset-env');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    publicPath: 'imgs/'
  },
  plugins: [
    new HtmlPlugin({
      title: 'Webpack 学习',
      template: './index.ejs'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      // chunkFilename: '[id].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /.(jpg|png|gif)$/,
        // loader: 'url-loader',
        // 图片大小小于8kb，就会被 base64 处理
        // 优点：减少请求数量，减轻服务器压力
        // 缺点：图片体积会更大，文件请求更慢
        // options: {
        //   limit: 8 * 1024,
          // 因为url-loader 默认使用 es6 模块化解析，而 html-loader 引入图片是 commonjs
          // 解析时会出现 [object Module]
          // 解决：关闭 url-loader 的 es6 模块化，使用commonjs 解析
          // esModule: false,
          // 给图片进行重命名——hash长度限制10位，ext 取原来的扩展名
          // name: '[hash:10].[ext]',
          // 输出到指定目录里
          // outputPath: 'imgs/'
        // },
        // type: 'javascript/auto',  // 在 webpack5 中使用旧版本的功能
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: '[hash:10].[ext]',
          outputPath: 'imgs/'
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[hash:10].[ext]',
          outputPath: 'media/'
        }
      },
    ]
  },
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