import { dateFormat } from '../js/Date'
const image = {
  state: {
    selectFileMode: '猫盒',
    data: []
  },
  mutations: {
    setImage (state, { url, id }) {
      const index = state.data.findIndex(i => i.id === id)
      const newData = { ...state.data[index] }
      newData.image = url
      newData.createTime = dateFormat('YYYY-mm-dd', new Date())
      newData.loading = false
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
