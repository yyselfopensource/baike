import Vue from 'vue'
import {
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  List,
  PullRefresh,
  Toast,
  Popup,
  Field,
  Dialog,
  Uploader,
  Icon,
  Lazyload
} from 'vant'

import App from './App.vue'
import router from './router'
import store from './store'
import {
  handleResizeDebounce
} from './util'
import request from './api/request'

// import './mock/index.js'
import './styles/index.scss'
/**
 * 同时对app的高度进行限定为初始窗口的100%，避免输入框引起的变化
 */
function setRootSize () {
  const designWidth = 1125
  document.documentElement.style.fontSize = `${document.documentElement.offsetWidth / designWidth * 100}px`

  document.querySelector('#app').style.height = `${window.innerHeight}px`
}
handleResizeDebounce(setRootSize)
setRootSize()
const components = [
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  List,
  PullRefresh,
  Popup,
  Field,
  Dialog,
  Uploader,
  Icon
]

components.forEach(component => Vue.use(component))

Vue.use(Lazyload)
Vue.config.productionTip = false
Vue.prototype.$http = request
Vue.prototype.$Toast = Toast
Vue.prototype.$toast = (message, options) => {
  return new Promise((resolve, reject) => {
    Toast({
      message,
      duration: 1000,
      ...options
    })
    setTimeout(resolve, 1000)
  })
}
Vue.prototype.$showLoading = (message = '加载中') => {
  Toast.loading({
    message,
    duration: 0,
    loadingType: 'spinner'
  })
}
Vue.prototype.$hideLoading = () => {
  Toast.clear()
}
window.setIntervalImmediate = function (fn, timeout) {
  fn()
  return setInterval(fn, timeout)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
