import Vue from 'vue'
import Vuex from 'vuex'
import image from './image'
import oss from './oss'
import configure from './configure'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    image,
    oss,
    configure
  }
})
