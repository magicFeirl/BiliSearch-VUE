import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
const SearchResult = () => import('../views/SearchResult.vue')
const DefaultPage = () => import('../views/DefaultPage.vue')

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
      path: '/about',
      component: DefaultPage
    },
    {
      path: '',
      component: SearchResult
    }
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router