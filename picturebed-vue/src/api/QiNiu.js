import store from '@/store'
import Utils from '@/js/Utils'

function QiNiu () {}
const qiniu = window.qiniu
function getToken () {
  const { secretKey, accessKey, bucket } = store.state.oss.Qiniu
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const options = {
    scope: bucket
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  return putPolicy.uploadToken(mac)
}
QiNiu.uploadImage = async (item, id) => {
  return new Promise((resolve, reject) => {
    const { host } = store.state.oss.Qiniu
    const uploadToken = getToken()
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z0
    const { path, name } = item
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    const key = Utils.getImageSavePath(store.state.oss.Qiniu.path, name)
    // 文件上传
    formUploader.putFile(uploadToken, key, path, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode === 200) {
        resolve({ status: 200, url: `${host}/${respBody.key}`, id })
      } else {
        console.log(respInfo.statusCode)
        console.log(respBody)
        resolve({ status: 403, message: respBody.error })
      }
    })
  })
}
export default QiNiu
