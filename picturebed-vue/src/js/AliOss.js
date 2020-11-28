import store from '../store/index'
import Utils from './Utils'
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
        bucket: store.state.oss.aliOss.bucket,
        secure: true
      })
      return true
    } else {
      return false
    }
  }

  async uploadFile (item, id) {
    // 设置阿里云对象存储上传的目录
    const path = store.state.oss.aliOss.uploadDirectory
    const uploadPath = path ? Utils.getImageSavePath(path, item.name) : item.name
    console.log(uploadPath)
    return await this.client.put(uploadPath, item).then(res => {
      console.log(res)
      const url = this.uploadSuccess(res).url
      return { status: 200, url, id }
    }).catch((e) => {
      return { status: 403, message: e.message }
    })
  }

  uploadSuccess (response) {
    // 上传成功 返回数据处理
    if (response && response.res.status === 200) {
      const domain = store.state.oss.aliOss.domain
      const style = store.state.oss.aliOss.style
      if (domain) {
        const re = new RegExp('^(https|http)\\:\\/\\/(.*?)\\/')
        response.url = response.url.replace(re, `https://${domain}/`)
      }
      if (style && response.url.search('x-oss-process=style') === -1) {
        response.url += '?x-oss-process=style/' + style
      }
    }
    return response
  }
}
