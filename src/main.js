// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {store} from './store'
import VueAnalytics from 'vue-analytics'

  var result = {};
  var regexParse = new RegExp('([a-z\-0-9]{2,63})\.([a-z\.]{2,5})$');
  var urlParts = regexParse.exec(window.location.hostname);
  result.domain = urlParts[1];
  result.type = urlParts[2];
  result.subdomain = window.location.hostname.replace(result.domain + '.' + result.type, '').slice(0, -1);

Vue.use(VueAnalytics, {
  id: ['UA-92934137-1'],
  router,
  autoTracking: {
    pageviewTemplate (route) {
      return {
        page: result.subdomain + route.path,
        title: document.title,
        location: window.location.href
      }
    }
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})

store.commit('calculateTotalCart');
