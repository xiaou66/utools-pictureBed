import store from '../store/index'
const COS = require('cos-js-sdk-v5')
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

  async uploadFile (item, id) {
    this.client.putObject({
      Bucket: store.state.oss.tencentOss.bucket,
      Region: store.state.oss.tencentOss.region,
      Key: item.name, /* 必须 */
      StorageClass: 'STANDARD',
      Body: item // 上传文件对象
    }, (err, data) => {
      if (err || data.statusCode !== 200) {
        return { status: 403, message: err.error }
      }
      return { status: 200, url: `https://${data.Location}`, id }
    })
  }
}
