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
    // 设置阿里云对象存储上传的目录
    const path = store.state.oss.aliOss.uploadDirectory
    const uploadPath = path ? `${path}/${item.name}` : item.name
    console.log(uploadPath)
    return await this.client.put(uploadPath, item).then(res => {
      console.log(res)
      const url = res.url.replace('http', 'https')
      return { status: 200, url, id }
    }).catch((e) => {
      return { status: 403, message: e.message }
    })
  }
}
