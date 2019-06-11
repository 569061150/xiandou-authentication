import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登陆'
      },
      component: () => import('@/components/login/login')
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      meta: {
        title: '修改密码'
      },
      component: () => import('@/components/forgetPassword/forgetPassword')
    },
    {
      path: '/',
      name: '/',
      meta: {
        title: '主页'
      },
      redirect: "/jq_management/equipment",
      component: () => import('@/components/defaut/main'),
      children: [
        {
          path: '/jq_management/equipment',
          name: 'account',
          meta: {
            title: '设备鉴权',
            auth: true
          },
          component: () => import('@/page/jq_management/equipment')
        },
        {
          path: '/jq_management/account',
          name: 'account',
          meta: {
            title: '账号鉴权',
            auth: true
          },
          component: () => import('@/page/jq_management/account')
        }
      ]
    },
    {
      path: '/help',
      name: 'help',
      meta: {
        title: '帮助'
      },
      component: () => import('@/components/defaut/help')
    },
    {
      path: '/privacy',
      name: 'privacy',
      meta: {
        title: '隐私'
      },
      component: () => import('@/components/defaut/privacy')
    },
    {
      path: '/terms',
      name: 'terms',
      meta: {
        title: '条款'
      },
      component: () => import('@/components/defaut/terms')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/components/defaut/404')
    }, {
      path: '*',
      name: '404',
      redirect: "/404"
    }
  ]
})


