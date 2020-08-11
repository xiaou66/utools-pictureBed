import store from '../store/index'
import Vue from 'vue'
const OSS = require('ali-oss')
export default class AliOss {
  constructor () {
    this.client = undefined
  }

  getClient () {
    if (store.state.oss.aliOss.region) {
      this.client = new OSS({
        region: store.state.oss.aliOss.region,
        accessKeyId: store.state.oss.aliOss.accessKeyId,
        accessKeySecret: store.state.oss.aliOss.accessKeySecret,
        bucket: store.state.oss.aliOss.bucket
      })
      return true
    } else {
      return false
    }
  }

  async uploadFile (item, id) {
    this.client.put(item.name, item).then(res => {
      console.log(res)
      const url = res.url.replace('http', 'https')
      console.log('11111')
      console.log(url)
      if (url) {
        fetch(url)
          .then(res => res.blob())
          .then(res => {
            store.commit('setImage', { url, id })
          }).catch(e => {
            store.commit('setImage', { url: res.url, id })
          })
      }
    }).catch((e) => {
      console.log(e)
      Vue.prototype.$message.error(e.message)
      Vue.prototype.$message.warning('上传失败')
    })
  }
}
