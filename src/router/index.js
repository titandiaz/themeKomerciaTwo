import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/_home'
import Products from '@/components/_products'
import Product from '@/components/_product'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    console.log(to, from)
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
    	path: '/productos',
    	component: Products,
      children: [
        {
          path: ':id',
          component: Product
        }
      ]
    }
  ]
})
