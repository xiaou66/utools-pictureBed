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
import Hello from '@/api/Hello'
import Upyun from '@/api/upyun'
import Gitee from '@/api/Gitee'
import QiNiu from '@/api/QiNiu'
import LskyPro from '@/api/LskyPro'
export const fileNameFormat = (uploadImageMode) => {
  const type = uploadImageMode || store.state.image.selectFileMode
  // const { } = store.state.oss
  switch (type) {
  }
  return ''
}
export const usableSource = (uploadImageMode) => {
  const type = uploadImageMode || store.state.image.selectFileMode
  switch (type) {
    case '阿里云OSS':
      return store.state.oss.aliOss.accessKeySecret
    case '腾讯云OSS':
      return store.state.oss.tencentOss.secretKey
    case '七牛云':
      return store.state.oss.Qiniu.accessKey && store.state.oss.Qiniu.secretKey
    case 'GitHub':
      return store.state.oss.GitHub.token && store.state.oss.GitHub.project
    case 'Gitee':
      return store.state.oss.Gitee.accessToken && store.state.oss.Gitee.owner
    case 'smMs':
      return store.state.oss.smMs.token
    case 'onedrive':
      return store.state.oss.onedrive.refreshToken
    case 'chevereto':
      return store.state.oss.chevereto.token
    case '又拍云':
      return store.state.oss.upyun.password && store.state.oss.upyun.username
    case 'Hello':
      return store.state.oss.Hello.password
    case 'LskyPro':
      return store.state.oss.lskyPro.servicePath
  }
  return true
}
export const uploadImage = async (item, id, uploadImageMode, {
  callback,
  path = ''
} = {}) => {
  const type = uploadImageMode || store.state.image.selectFileMode
  switch (type) {
    case '猫盒':
      return await catbox.uploadImage(item, id)
    case '牛图网':
      return await niupic.uploadImage(item, id)
    case 'GitHub':
      return await GitHub.uploadImage(item, id)
    case 'onedrive':
      return await onedrive(item, id)
    case 'Gitee':
      return await Gitee.uploadImage(item, id)
    case '又拍云':
      return await Upyun.uploadImage(item, id)
    case '七牛云':
      return await QiNiu.uploadImage(item, id, path)
    case 'smMs':
      return await smMs.uploadImage(item, id, path)
    case 'imgUrlOrg':
      return await imgUrlOrg.uploadImage(item, id)
    case 'chevereto':
      return await chevereto(item, id)
    case 'Hello':
      return await Hello.uploadImage(item, id)
    case 'LskyPro':
      return await LskyPro.uploadImage(item, id)
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
