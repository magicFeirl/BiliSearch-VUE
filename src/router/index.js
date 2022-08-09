import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

const SearchResult = () => import('../views/SearchResult.vue')
const DefaultPage = () => import('../views/DefaultPage.vue')
const HotVideos = () => import('../views/HotVideos.vue')

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home,
  children: [{
      path: 'search',
      component: SearchResult,
      props: route => ({ query_param: route.query }),
    },
    {
      path: 'about',
      component: DefaultPage
    },
    {
      path: '',
      component: SearchResult
    },
    {
      path: 'hot',
      component: HotVideos
    }
  ]
}]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return {y: 0, behavior: 'smooth'}
  }
})

router.beforeEach((to, from, next) => {
  if (window._hmt) {
    if (to.path) {
      window._hmt.push(['_trackPageview', to.fullPath])
    }
  }

  next()
})

export default router