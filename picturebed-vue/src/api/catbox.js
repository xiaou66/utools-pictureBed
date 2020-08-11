import store from '../store/index'
import Vue from 'vue'
function catbox () {}
catbox.uploadImage = (item, id) => {
  const formData = new FormData()
  formData.append('fileToUpload', item)
  formData.append('reqtype', 'fileupload')
  fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: formData
  }).then(res => res.text())
    .then(res => {
      store.commit('setImage', { url: res, id })
    }).catch(() => {
      Vue.prototype.$message.warning('上传失败')
    })
}
export default catbox
