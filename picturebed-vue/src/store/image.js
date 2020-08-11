import { dateFormat } from '../js/Date'
import store from '../store/index'
import Vue from 'vue'
const image = {
  state: {
    selectFileMode: '图壳',
    data: []
  },
  mutations: {
    setImage (state, { url, id }) {
      const index = state.data.findIndex(i => i.id === id)
      const newData = { ...state.data[index] }
      newData.image = url
      newData.createTime = dateFormat('YYYY-mm-dd', new Date())
      newData.loading = false
      Vue.prototype.$message.success('上传成功')
      if (store.state.configure.autoCopy.enabled) {
        switch (store.state.configure.autoCopy.mode) {
          case 'url':
            Vue.prototype.$copyText(newData.image).then(() => {
              Vue.prototype.$message.success('复制成功')
            })
            break
          case 'md':
            Vue.prototype.$copyText(`![](${newData.image})`).then(() => {
              Vue.prototype.$message.success('复制成功')
            })
            break
          case 'html':
            Vue.prototype.$copyText(`<img src="${newData.image}"  />`).then(() => {
              Vue.prototype.$message.success('复制成功')
            })
            break
        }
      }
      state.data.splice(index, 1, newData)
    },
    deleteImageItem (state, id) {
      const index = state.data.findIndex(i => i.id === id)
      state.data.splice(index, 1)
    },
    clearInvalidImage (state) {
      state.data = state.data.filter(i => i.loading === false)
    },
    clearImage (state) {
      state.data = []
    }
  },
  actions: {
  },
  getters: { }
}

export default image
