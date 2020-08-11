import store from '../store/index'
import Vue from 'vue'
function uploadCC () {}
uploadCC.uploadImage = (item, id) => {
  const formData = new FormData()
  formData.append('uploaded_file[]', item)
  // code == 100 失败
  fetch('https://upload.cc/image_upload', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.total_error === 0) {
        store.commit('setImage', { url: `https://upload.cc/${res.success_image[0].url}`, id })
      } else {
        Vue.prototype.$message.warning('上传失败')
      }
    }).catch(() => {
      Vue.prototype.$message.warning('上传失败')
    })
}
export default uploadCC
