import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index')
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/setting'),
    children: [
      {
        path: 'aliOss',
        name: 'aliOss',
        component: () => import('../views/setting/aliOss')
      },
      {
        path: 'tencentOss',
        name: 'tencentOss',
        component: () => import('../views/setting/tencentOss')
      },
      {
        path: 'rruu',
        name: 'rruu',
        component: () => import('../views/setting/rruu')
      },
      {
        path: 'Hidove',
        name: 'Hidove',
        component: () => import('../views/setting/Hidove')
      },
      {
        path: 'contributions',
        name: 'contributions',
        component: () => import('../views/setting/contributions')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
