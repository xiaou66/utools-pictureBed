import imgkr from './imgkr'
import Vue from 'vue'
import catbox from './catbox'
import rruu from './rruu'
import uploadCC from './uploadCC'
import imgUrlOrg from './imgUrlOrg'
import store from '../store/index'
import tudo from './tudo'
import niuTu from './niuTu'

export const uploadImage = (item, id) => {
  const type = store.state.image.selectFileMode
  switch (type) {
    case '图壳':
      imgkr.uploadImage(item, id)
      break
    case '猫盒':
      catbox.uploadImage(item, id)
      break
    case '如优-阿里图床':
      rruu.uploadImage(item, id, 'ali')
      break
    case '如优-头条':
      rruu.uploadImage(item, id, 'toutiao')
      break
    case '如优-网易':
      rruu.uploadImage(item, id, 'neteasy')
      break
    case '如优-掘金':
      rruu.uploadImage(item, id, 'juejin')
      break
    case '如优-搜狗':
      rruu.uploadImage(item, id, 'sougou')
      break
    case '如优-Postimages':
      rruu.uploadImage(item, id, 'postimages')
      break
    case '土豆-小米':
      tudo.uploadImage(item, id, 'xiaomi')
      break
    case '土豆-头条':
      tudo.uploadImage(item, id, 'toutiao')
      break
    case '土豆-百度':
      tudo.uploadImage(item, id, 'BaiDu')
      break
    case 'uploadCC':
      uploadCC.uploadImage(item, id)
      break
    case 'imgUrlOrg':
      imgUrlOrg.uploadImage(item, id)
      break
    case '牛图网':
      niuTu.uploadImage(item, id)
      break
  }
  if (type === '阿里云OSS') {
    const aliOss = Vue.prototype.$aliOss
    console.log('11111111111111')
    if (!aliOss.client) {
      const status = aliOss.getClient()
      if (!status) {
        Vue.prototype.$message.warning('请重新配置 ali-oss')
      }
    }
    aliOss.uploadFile(item, id)
  } else if (type === '腾讯云OSS') {
    const tencentOss = Vue.prototype.$tencentOss
    if (!tencentOss.client) {
      const status = tencentOss.getClient()
      if (!status) {
        Vue.prototype.$message.warning('请重新配置 tencent-oss')
      }
    }
    debugger
    tencentOss.uploadFile(item, id)
  }
}
