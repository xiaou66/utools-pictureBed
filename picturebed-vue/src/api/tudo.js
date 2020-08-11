import store from '../store/index'
import Vue from 'vue'
function tudo () {}
tudo.uploadImage = (item, id, type) => {
  const formData = new FormData()
  formData.append('image', item)
  formData.append('apiType', type)
  formData.append('token', store.state.oss.tudo.token)
  fetch(`${Vue.prototype.$url.ac}/api/upload`, {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      store.commit('setImage', { url: res.data.url[type.toLowerCase()], id })
    }).catch(() => {
      Vue.prototype.$message.warning('上传失败')
    })
}
export default tudo
