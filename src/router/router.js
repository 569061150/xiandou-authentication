import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: () => import(`@/components/login/login`)
  }, {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () => import(`@/components/forgetPassword/forgetPassword`)
  }, {
    path: '/',
    name: '首页',
    redirect: "/jq_management/equipment",
    component: () => import(`@/components/defaut/main`),
    children: [{
      path: '/jq_management/equipment',
      name: 'account',
      meta: {auth: true},
      component: () => import(`@/page/jq_management/equipment`)
    },{
      path: '/jq_management/account',
      name: 'account',
      meta: {auth: true},
      component: () => import(`@/page/jq_management/account`)
    }]
  }, {
    path: '/help',
    name: 'help',
    component: () => import(`@/components/defaut/help`)
  }, {
    path: '/privacy',
    name: 'privacy',
    component: () => import(`@/components/defaut/privacy`)
  }, {
    path: '/terms',
    name: 'terms',
    component: () => import(`@/components/defaut/terms`)
  }, {
    path: '/404',
    name: '404',
    component: () => import(`@/components/defaut/404`)
  }, {
    path: '*',
    name: '404',
    redirect: "/404"
  }]
})


