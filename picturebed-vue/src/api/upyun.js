import store from '../store/index'
import crypto from 'crypto'
function Upyun () {}
function getToken (bucketName) {
  const { username, password, path } = store.state.oss.upyun
  const expiration = ((Date.now() / 1000) >>> 0) + 30 * 60
  const method = 'POST'
  const policy = base64(
    JSON.stringify({
      bucket: bucketName,
      'save-key': path || '/{filename}{.suffix}',
      expiration: expiration
    })
  )
  const authorization =
    'UPYUN ' +
    username +
    ':' +
    hmacsha1(MD5(password), method + '&/' + bucketName + '&' + policy)
  return {
    authorization: authorization,
    policy: policy
  }
}
Upyun.uploadImage = async (item, id) => {
  console.log(store.state.oss.upyun)
  const { bucketName, host } = store.state.oss.upyun
  const { policy, authorization } = getToken(bucketName)
  const formData = new FormData()
  formData.append('file', item)
  formData.append('policy', policy)
  formData.append('authorization', authorization)
  return await fetch(`http://v0.api.upyun.com/${bucketName}`, {
    method: 'POST',
    url: 'http://v0.api.upyun.com/',
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.code !== 200) {
        return { status: 403, url: res.message, id }
      }
      // eslint-disable-next-line no-undef
      return { status: 200, url: `${host}${res.url}`, id }
    })
}
// base64
function base64 (value) {
  return Buffer.from(value).toString('base64')
}
// hmacsha1
function hmacsha1 (secret, value) {
  return crypto.createHmac('sha1', secret).update(value, 'utf-8').digest().toString('base64')
}
// MD5
function MD5 (value) {
  return crypto
    .createHash('md5')
    .update(value)
    .digest('hex')
}

export default Upyun
