import store from '../store/index'
import Vue from 'vue'
function rruu () {}
rruu.uploadImage = (item, id, type) => {
  const formData = new FormData()
  formData.append('image', item)
  formData.append('apiType', type)
  formData.append('token', store.state.oss.rruu.token)
  fetch('https://img.rruu.net/api/upload', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      store.commit('setImage', { url: res.data.url[type], id })
    }).catch(() => {
      Vue.prototype.$message.warning('上传失败')
    })
}
export default rruu
