import store from '../store/index'
import Vue from 'vue'
function imgUrlOrg () {}
imgUrlOrg.uploadImage = (item, id) => {
  const formData = new FormData()
  formData.append('file', item)
  fetch('https://imgurl.org/upload/ftp', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      store.commit('setImage', { url: res.url, id })
    }).catch(() => {
      Vue.prototype.$message.warning('上传失败')
    })
}
export default imgUrlOrg
