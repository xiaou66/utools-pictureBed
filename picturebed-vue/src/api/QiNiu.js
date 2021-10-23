import store from '@/store'
import Utils from '@/js/Utils'
import Vue from 'vue'

function QiNiu () {}
const qiniu = window.qiniu
function getToken () {
  const { secretKey, accessKey, bucket } = store.state.oss.Qiniu
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const options = {
    scope: bucket,
    expires: 7200
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  return putPolicy.uploadToken(mac)
}
QiNiu.uploadImage = async (item, id, path) => {
  return new Promise((resolve, reject) => {
    const { host, zone, cdn } = store.state.oss.Qiniu
    let uploadToken = Vue.prototype.$Cache.get('QiNiu-token')
    if (!uploadToken) {
      uploadToken = getToken()
      Vue.prototype.$Cache.set('QiNiu-token', uploadToken, 60 * 60)
    }
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone[zone]
    config.useCdnDomain = cdn
    const { name } = item
    const formUploader = new qiniu.form_up.FormUploader(config)
    const putExtra = new qiniu.form_up.PutExtra()
    const key = Utils.getImageSavePath(store.state.oss.Qiniu.path, name)
    // 文件上传
    if (!path) {
      const ext = name.substr(name.lastIndexOf('.') + 1)
      path = window.utools.getPath('temp') + '/' + 'utools-pictureBed-temp-QiNiu' + '.' + ext
      const fr = new FileReader()
      fr.readAsDataURL(item)
      fr.onloadend = (e) => {
        const base64 = e.target.result.split(',')[1]
        window.saveTempFile(base64, path)
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
      }
      // window.saveTempFile(path)
    } else {
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
    }
  })
}
export default QiNiu
