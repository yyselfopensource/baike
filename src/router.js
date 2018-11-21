import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const req = require.context('./views/threejs', false, /\.vue$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
const chapters = requireAll(req)
const chapterRoutes = []
const chapterMenus = []
req.keys().forEach((key, index) => {
  chapterRoutes.push({
    path: `/three/${key.replace('./', '').replace('.vue', '')}`,
    name: `/three/${key.replace('./', '').replace('.vue', '')}`,
    component: chapters[index].default,
    meta: {
      title: chapters[index].default.title
    }
  })
  chapterMenus.push({
    path: chapterRoutes[index].path,
    name: chapterRoutes[index].name,
    title: chapterRoutes[index].meta.title
  })
})

export const menus = chapterMenus
const router = new Router({
  mode: 'history',
  base: '/frontend',
  routes: [
    ...chapterRoutes,
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
