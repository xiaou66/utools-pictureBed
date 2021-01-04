import store from '../store/index'
const COS = require('cos-js-sdk-v5')
const re = new RegExp('^((https|http)\\:\\/\\/)?(.*?)\\/')
export default class TencentOss {
  constructor () {
    this.client = undefined
  }

  getClient () {
    if (store.state.oss.tencentOss.secretKey && store.state.oss.tencentOss.secretId) {
      this.client = new COS({
        SecretId: store.state.oss.tencentOss.secretId,
        SecretKey: store.state.oss.tencentOss.secretKey
      })
      return true
    } else {
      return false
    }
  }

  async uploadFile (item, id, callback) {
    this.client.putObject({
      Bucket: store.state.oss.tencentOss.bucket,
      Region: store.state.oss.tencentOss.region,
      Key: store.state.oss.tencentOss.path + item.name, /* 必须 */
      StorageClass: 'STANDARD',
      Body: item // 上传文件对象
    }, (err, data) => {
      console.log(err)
      console.log(data)
      if (err || data.statusCode !== 200) {
        // eslint-disable-next-line standard/no-callback-literal
        callback({ status: 403, message: err.error })
      }
      const url = this.uploadSuccess(data).url
      // eslint-disable-next-line standard/no-callback-literal
      callback({ status: 200, url: url, id })
    })
  }

  uploadSuccess (response) {
    // 上传成功 返回数据处理
    if (response && response.statusCode === 200) {
      const domain = store.state.oss.tencentOss.domain
      const style = store.state.oss.tencentOss.style
      if (domain) {
        response.url = response.Location.replace(re, `https://${domain}/`)
      } else {
        response.url = `https://${response.Location}`
      }
      if (style && response.Location.search('imageMogr2') === -1) {
        response.url = response.Location + '?imageMogr2/' + style
      }
    }
    return response
  }
}
