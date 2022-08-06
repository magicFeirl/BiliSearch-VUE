import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/css/icons.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import 'virtual:windi.css'

Vue.config.productionTip = false


axios.defaults.baseURL = '/search-api/'; 
axios.defaults.timeout= 1000 * 10;
// 添加请求拦截器，在发请求之前会调用这个回调添加 Auth 请求头字段
// 在发送请求前加载进度条
axios.interceptors.request.use(config => {
  NProgress.start();
  return config; // 固定写法
}, (config) => {
	NProgress.done();
	return Promise.reject('请求出错');
});

axios.interceptors.response.use(config => {
  NProgress.done();
  return config; // 固定写法
});

Vue.prototype.$http = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
