import Vue from 'vue'
import catbox from './catbox'
import imgUrlOrg from './imgUrlOrg'
import store from '../store/index'
import GitHub from './GitHub'
import niupic from './niupic'
import smMs from './smMs'
import onji from '@/api/onji'
import onedrive from '@/api/onedrive'
import chevereto from '@/api/chevereto'

export const uploadImage = async (item, id, uploadImageMode, callback) => {
  const type = uploadImageMode || store.state.image.selectFileMode
  switch (type) {
    case '猫盒':
      return await catbox.uploadImage(item, id)
    case '牛图网':
      return await niupic.uploadImage(item, id)
    case 'smMs':
      return await smMs.uploadImage(item, id)
    case 'GitHub':
      return await GitHub.uploadImage(item, id)
    case 'imgUrlOrg':
      return await imgUrlOrg.uploadImage(item, id)
    case 'onedrive':
      return await onedrive(item, id)
    case 'chevereto':
      return await chevereto(item, id)
  }
  if (type.includes('映画')) {
    const nodeName = type.split('/')[1]
    return await onji.uploadImage(item, id, nodeName)
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
    return await tencentOss.uploadFile(item, id, callback)
  }
}
