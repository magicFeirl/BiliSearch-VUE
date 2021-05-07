import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/Home.vue'
import SearchResult from '../components/SearchResult.vue'
import DefaultPage from '../components/DefaultPage.vue'


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
      path: '',
      component: DefaultPage
    }
  ]
}]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router