import store from '../store/index'
import Vue from 'vue'
const url = Vue.prototype.$url.imgkr
function imgkr () {}
imgkr.uploadImage = (item, id) => {
  const fromData = new FormData()
  fromData.append('file', item)
  const fetch = window.nodeFetch ? window.nodeFetch : window.fetch
  fetch(`${url}/api/v2/files/upload`, {
    headers: {
      Cookie: '_ga=GA1.2.1327215634.1593694091; _gid=GA1.2.668497135.1596770201',
      'X-Requested-With': 'XMLHttpRequest',
      Referer: 'https://imgkr.com/',
      'Content-Type': 'multipart/form-data;',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
    },
    method: 'post',
    body: fromData
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      if (res.code === 200) {
        store.commit('setImage', { url: res.data, id })
      } else {
        Vue.prototype.$message.warning('上传失败')
      }
    }).catch(() => {
      Vue.prototype.$message.warning('上传失败')
    })
}
export default imgkr
