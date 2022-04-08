import store from '../store/index'
function imgUrlOrg () {}
imgUrlOrg.uploadImage = async (item, id) => {
  const formData = new FormData()
  const { uid, token, host } = store.state.oss.imgUrlOrg
  formData.append('file', item)
  formData.append('uid', uid)
  formData.append('token', token)
  return await fetch(`${host || 'https://www.imgurl.org'}/api/v2/upload`, {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return { status: 200, url: res.data.url, id }
      }
      return { status: 403, message: res.msg }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default imgUrlOrg
