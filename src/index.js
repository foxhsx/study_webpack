import Vue from 'vue';
import App from './App.vue';
// import './styles/common.less'

// ! 这里的写法有两种，一种是模板写法，即在 options 里写 el 来配置挂载点，还有一种就是下面的 runtime 方式
// ! 如果使用模板的方式，那么此时会报错，开发环境 runtime 下，应该是使用 runtime 的写法，或者需要在
// ! webpack.config.js 中配置 reslove.alias --> 'vue$': 'vue/dist/vue.esm.js' 
new Vue({
  render: h => h(App)
}).$mount('#root')