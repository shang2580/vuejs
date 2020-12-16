import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import "./assets/css/global.css"
import axios from "axios";
import "./assets/fonts/iconfont.css"

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false
//  配置axios 
//  配置请求根路径
  axios.defaults.baseURL= 'http://127.0.0.1:8888/api/private/v1/';
  //  设置请求拦截
  axios.interceptors.request.use(config=>{
    // 每一个请求前 先添加上 之前获取到的 token 令牌
    config.headers.Authorization = window.sessionStorage.getItem("token")

    return config

  })
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
