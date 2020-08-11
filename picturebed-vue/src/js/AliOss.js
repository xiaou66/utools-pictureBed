import store from '../store/index'
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
    return await this.client.put(item.name, item).then(res => {
      console.log(res)
      const url = res.url.replace('http', 'https')
      return { status: 200, url, id }
    }).catch((e) => {
      return { status: 403, message: e.message }
    })
  }
}
