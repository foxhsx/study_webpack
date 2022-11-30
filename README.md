# Webpack 学习笔记

## 认识 Webpack

首先我们要知道 Webpack 是一个用于现代 JavaScript 应用程序的**静态模块打包工具**。它的**核心功能**就是**解决模块之间的依赖关系**，它从一个或者多个入口来构建文件模块之间的依赖图，按照特定的规则和顺序将其组织在一起，最终打包为一个或多个 JS 文件。这个过程我们叫做模块打包，打包后的产物都属于静态资源。

Webpack 最初的目标就是实现前端项目的模块化，它所解决的问题是**如何在前端项目中更高效地管理和维护项目中的每个资源**。

在 Webpack 看来，**一切皆模块**。通过模块化的方式去组织项目，可以提高我们的开发效率，并降低维护成本。

Webpack 有**五个核心概念**（实际我们会用到的）：

- Entry-入口：指定 Webpack 以哪个入口起点开始打包，分析构建内部依赖图
- Output-出口：指定 Webpack 打包后的资源 bundles 会输出到哪里去，以及它们如何进行命名
- Loader-预处理器：因为它本身只理解 JS 和 JSON 文件，所以需要 loader 来使 Webpack 能够处理那些非 JavaScript 文件。
- Plugins-插件：扩展更多的功能，执行范围更广的任务
- Mode-模式：对应开发模式，默认值是 `production`

mode 的部分支持以下字段：

| 选项        | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| development | 会将 DefinePlugin 中 `process.env.NODE_ENV` 的值设置为 `development`。为模块和 chunk 启用有效的名字 |
| production  | 会将 DefinePlugin 中 `process.env.NODE_ENV` 的值设置为 `production`。为模块和 chunk 启用确定性的混淆名称。<br />FlagDependencyUsagePlugin<br />FlagIncludedChunksPlugin<br />ModuleConcatenationPlugin<br />NoEmitOnErrorsPlugin 和 TerserPlugin |
| none        | 不使用任何默认优化选项                                       |

Webpack 不但为我们提供了打包的能力，还提供许多其他强大的功能，比如代码拆分，通过配置 `optimization` 里的属性来将应用中所有的模块按照我们的需要分块进行打包。这样一来，就不用担心将全部的代码都打到一个构建产物中，导致文件体积过大，浏览器加载缓慢的问题。

我们可以把应用初次加载所必需的模块打包到一起，其他的模块再单独打包，等到实际需要用到某个模块，再按需加载，可以达到最大化的交互体验收益。

## 一、基础篇

### 1. Webpack 安装

第一，先创建一个目录，比如 webpack_demo，然后在目录下 npm init，初始化项目。

第二，我们安装到本地。

```bash
npm install webpack webpack-cli -D
```

这里 -D 会将 webpack 和 webpack-cli 安装到我们的开发依赖。等价与 --save-dev。

第三，创建一些基础目录(src, build, index.js )

第四，开始写一些配置

第五，使用 `npm scritp`，即在 `package.json`中增加一个脚本命令:

```json
"scripts": {
  "build": "webpack"
}
```

我们也可以选择进行全局安装：

```bash
npm install webpack webpack-cli -g
```

然后使用指令的方式来运行 `webpack`：

- 开发环境：`npx webpack ./src/index.js --output-filename=built.js -o ./build --mode=development`，webpack 会以./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js ；整体打包环境为开发环境。这里的 npx 是当本地安装 webpack ，而全局没有安装时使用，如果全局安装，则只使用 webpack即可。
- 生产环境：`npx webpack ./src/index.js --output-filename=built.js -o ./build --mode=production`，webpack 会以./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js ；整体打包环境为生产环境。
- webpack 本身能处理 js 和 json 资源，不能处理 css 和 img 等其他资源。
- 生产环境和开发环境将 ES6 模块化编译成浏览器能识别的其他模块
- 生产环境比开发环境多了压缩 js 代码。

webpack 开箱即用，可以不需要配置文件，也就是说使用默认配置：

- 入口为：`src/index.js`
- 出口为：`dist/main.js` 
- 生产环境下开启压缩和优化

但是实际上对于我们自己的项目来说，肯定是需要在原有的基础上进行扩展和覆盖的，所以 webpack 也允许我们在项目根目录下创建一个 `webpack.config.js` 的配置文件，然后打包构建时会自动使用它。

> **Tip**
>
> :panda_face:：我们也可以指定使用不同的配置文件 `webpack --config xxx.config.js`

### 2. 入口-entry







