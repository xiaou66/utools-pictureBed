import store from '../store/index'
import Vue from 'vue'
function niuTu () {}
niuTu.uploadImage = (item, id) => {
  const formData = new FormData()
  formData.append('image_field', item)
  fetch('https://niupic.com/index/upload/process', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        store.commit('setImage', { url: `https://${res.data}`, id })
      } else {
        Vue.prototype.$message.warning('上传失败')
      }
    }).catch(() => {
      Vue.prototype.$message.warning('上传失败')
    })
}
export default niuTu
