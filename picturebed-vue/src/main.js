import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueClipboard from 'vue-clipboard2'
import AliOss from './js/AliOss'
import TencentOss from './js/TencentOss'
import NodeCache from 'node-cache'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.prototype.$url = {}
if (process.env.NODE_ENV === 'development') {
  Vue.prototype.$url.imgkr = '/imgkr'
  Vue.prototype.$url.ac = '/ac'
} else {
  Vue.prototype.$url.imgkr = 'https://imgkr.com'
  Vue.prototype.$url.ac = 'https://images.ac.cn'
}

Vue.use(Antd)
Vue.prototype.$aliOss = new AliOss()
Vue.prototype.$tencentOss = new TencentOss()
Vue.prototype.$Cache = new NodeCache()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
