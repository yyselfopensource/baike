import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/frontend',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (window.keepScroll && window.keepScroll.scrollElements[from.path]) {
    window.keepScroll.scrollTops[from.path] = window.keepScroll.scrollElements[from.path].scrollTop
  }
  next()
})
router.afterEach((to, from) => {
  document.title = to.meta && to.meta.title
  if (window.keepScroll && window.keepScroll.scrollElements[to.path]) {
    setTimeout(() => {
      window.keepScroll.scrollElements[to.path].scrollTop = window.keepScroll.scrollTops[to.path]
    }, 100)
  }
})

export default router
