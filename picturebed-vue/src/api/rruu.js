import store from '../store/index'
function rruu () {}
rruu.uploadImage = async (item, id, type) => {
  const formData = new FormData()
  formData.append('image', item)
  formData.append('apiType', type)
  formData.append('token', store.state.oss.rruu.token)
  return await fetch('https://img.rruu.net/api/upload', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      return { status: 200, url: res.data.url[type], id }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default rruu
