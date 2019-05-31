import Vue from 'vue'
import router from './router/router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

import {generaMenu} from '@/config/tools'


Vue.use(Element)


// 登录状态判断

router.beforeEach((to, from, next) => {

  if (to.matched.some(m => m.meta.auth)) {
    if (window.localStorage.token === '1') {
      next()
    } else if (to.path !== '/') {
      next({path: '/login'})
      console.log("检测到您还未登录,请登录后操作!");
    }
  } else {
    if (window.localStorage.token === '1') {
      next({path: '/jq_management/equipment'})
    } else {
      next();
    }
  }
})


new Vue({
  router,
  store
}).$mount('#app')
