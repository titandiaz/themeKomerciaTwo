import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/_home'
import Products from '@/components/_products'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
    	path: '/productos',
    	component: Products,
    }
  ]
})
