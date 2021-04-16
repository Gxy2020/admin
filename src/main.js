import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './assets/css/global.css'
import './icons';
import axios from 'axios'
// // eslint-disable-next-line no-unused-vars
// import Blob from './assets/excel/Blob'
// // eslint-disable-next-line no-unused-vars
// import Export2Excel from './assets/excel/Export2Excel.js'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置NProgress进度条选项 —— 动画效果
// NProgress开始进度条
NProgress.configure({ showSpinner: false })
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})



Vue.prototype.$axios=axios
// axios.defaults.baseURL='http://localhost:8888'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
