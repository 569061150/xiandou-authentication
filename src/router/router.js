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
      redirect: {
        name: 'equipment'
      },
      meta: {
        title: '主页'
      },
      component: () => import('@/components/defaut/main'),
      children: [
        {
          path: '/jq_management/equipment',
          name: 'equipment',
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
        },
        {
          path: '/Black_White_List/equipmentList',
          name: 'equipmentList',
          meta: {
            title: '设备黑白名单',
            auth: true
          },
          component: () => import('@/page/Black_White_List/equipmentList')
        },
        {
          path: '/Black_White_List/accountList',
          name: 'accountList',
          meta: {
            title: '账号黑白名单',
            auth: true
          },
          component: () => import('@/page/Black_White_List/accountList')
        },
        {
          path: '/Channel/ChannelManagement',
          name: 'ChannelManagement',
          meta: {
            title: '渠道管理',
            auth: true
          },
          component: () => import('@/page/Channel/ChannelManagement')
        },
        {
          path: '/report/center',
          name: 'center',
          meta: {
            title: '报表中心',
            auth: true
          },
          component: () => import('@/page//report/center')
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
      redirect: {
        name: '404'
      }
    }
  ]
})


