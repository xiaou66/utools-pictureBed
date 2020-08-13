import Vue from 'vue'
import catbox from './catbox'
import rruu from './rruu'
import imgUrlOrg from './imgUrlOrg'
import store from '../store/index'
import GitHub from './GitHub'

export const uploadImage = async (item, id) => {
  const type = store.state.image.selectFileMode
  switch (type) {
    case '猫盒':
      return await catbox.uploadImage(item, id)
    case 'GitHub':
      return await GitHub.uploadImage(item, id)
    case '如优-阿里图床':
      return await rruu.uploadImage(item, id, 'ali')
    case '如优-头条':
      return await rruu.uploadImage(item, id, 'toutiao')
    case '如优-网易':
      return await rruu.uploadImage(item, id, 'neteasy')
    case '如优-掘金':
      return await rruu.uploadImage(item, id, 'juejin')
    case '如优-搜狗':
      return await rruu.uploadImage(item, id, 'sougou')
    case '如优-Postimages':
      return await rruu.uploadImage(item, id, 'postimages')
    case 'imgUrlOrg':
      return await imgUrlOrg.uploadImage(item, id)
  }
  if (type === '阿里云OSS') {
    const aliOss = Vue.prototype.$aliOss
    console.log('11111111111111')
    if (!aliOss.client) {
      const status = aliOss.getClient()
      if (!status) {
        return { status: 403, message: '请重新配置 ali-oss' }
      }
    }
    return await aliOss.uploadFile(item, id)
  } else if (type === '腾讯云OSS') {
    const tencentOss = Vue.prototype.$tencentOss
    if (!tencentOss.client) {
      const status = tencentOss.getClient()
      if (!status) {
        return { status: 403, message: '请重新配置 tencent-oss' }
      }
    }
    return await tencentOss.uploadFile(item, id)
  }
}
