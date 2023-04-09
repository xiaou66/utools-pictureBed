import store from '../store/index'
function smMs () {}
smMs.uploadImage = async (item, id) => {
  const formData = new FormData()
  formData.append('smfile', item)
  formData.append('format', 'json')
  return await fetch('https://smms.app/api/v2/upload', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${store.state.oss.smMs.token}`
    },
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.success) {
        return { status: 200, url: res.data.url, id }
      } else {
        return { status: 403, message: '已经上传过一样的图片' }
      }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default smMs
