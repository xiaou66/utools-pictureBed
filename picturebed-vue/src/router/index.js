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
        path: 'imageData',
        name: 'imageData',
        component: () => import('../views/setting/imageData')
      },
      {
        path: 'tencentOss',
        name: 'tencentOss',
        component: () => import('../views/setting/tencentOss')
      },
      {
        path: 'GitHub',
        name: 'GitHub',
        component: () => import('../views/setting/GitHub')
      },
      {
        path: 'Gitee',
        name: 'Gitee',
        component: () => import('../views/setting/Gitee')
      },
      {
        path: 'QiNiu',
        name: 'QiNiu',
        component: () => import('../views/setting/QiNiu')
      },
      {
        path: 'smMs',
        name: 'smMs',
        component: () => import('../views/setting/smMs')
      },
      {
        path: 'hello',
        name: 'hello',
        component: () => import('../views/setting/hello')
      },
      {
        path: 'imgUrlOrg',
        name: 'imgUrlOrg',
        component: () => import('../views/setting/imgUrlOrg')
      },
      {
        path: 'upyun',
        name: 'upyun',
        component: () => import('../views/setting/upyun')
      },
      {
        path: 'onedrive',
        name: 'onedrive',
        component: () => import('../views/setting/onedrive')
      },
      {
        path: 'chevereto',
        name: 'chevereto',
        component: () => import('../views/setting/chevereto')
      },
      {
        path: 'webService',
        name: 'webService',
        component: () => import('../views/setting/webService')
      },
      {
        path: 'general',
        name: 'general',
        component: () => import('../views/setting/general')
      },
      {
        path: 'LskyPro',
        name: 'LskyPro',
        component: () => import('../views/setting/LskyPro')
      },
      {
        path: 'catbox',
        name: 'catbox',
        component: () => import('../views/setting/catbox')
      },
      {
        path: 'interconnectConfig',
        name: 'interconnectConfig',
        component: () => import('../views/setting/interconnectConfig')
      },
      {
        path: 's3',
        name: 's3Config',
        component: () => import('../views/setting/s3Config.vue')
      },
      {
        path: '123Pan',
        name: '123Pan',
        component: () => import('../views/setting/123Pan.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
