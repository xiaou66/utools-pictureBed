import axios from 'axios'
import store from '../store/index'
import Vue from 'vue'
import Utils from '@/js/Utils'
const service = axios.create()
service.interceptors.response.use((response) => response,
  (error) => {
    alert(error.response.statusText)
    return Promise.reject(error)
  })

export function uploadSmall (file, path, token) {
  return service({
    method: 'PUT',
    url: `https://graph.microsoft.com/v1.0/me/drive/root:/${path}:/content`,
    data: file,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export function getUploadUrl (filePath, token) {
  return service({
    method: 'POST',
    url: `https://graph.microsoft.com/v1.0/drive/root:/${filePath}:/createUploadSession`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}
export function uploadLarge (data, url, size) {
  return service({
    method: 'PUT',
    url,
    data,
    headers: {
      'Content-Range': `bytes 0-${size - 1}/${size}`
    }
  })
}

export function getShareId (fileId, token) {
  return axios({
    method: 'POST',
    url: `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/createLink`,
    data: {
      type: 'view',
      scope: 'anonymous'
    },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
}

export function genShareUrl (shareId) {
  return `https://api.onedrive.com/v1.0/shares/${shareId}/root/content`
}
async function getToken () {
  // eslint-disable-next-line no-unused-expressions
  const $Cache = Vue.prototype.$Cache
  const token = $Cache.get('onedrive_token')
  if (token) {
    return token
  }
  return await service.post('https://xiaou.icu/music/microsoftGraph/auth/refresh_token', {
    refresh_token: store.state.oss.onedrive.refreshToken
  })
    .then(res => {
      const { status, data } = res.data
      if (status === 200) {
        store.state.oss.onedrive.refreshToken = data.refresh_token
        $Cache.set('onedrive_token', data.access_token, 50 * 60)
        return data.access_token
      } else {
        return ''
      }
    }).catch(e => {
      return ''
    })
}
export default async (item, id) => {
  const directory = store.state.oss.onedrive.path
  const uploadPath = directory ? Utils.getImageSavePath(directory, item.name) : 'pic' + item.name
  const fullPath = uploadPath
  const token = await getToken()
  if (!token) {
    return { status: 403, message: '绑定账号已经过期需要重新绑定' }
  }
  let uploadResponse
  if (item.size > 4 * 1000 * 1000) {
    // 大文件
    const { data } = await getUploadUrl(fullPath, token)
    uploadResponse = await uploadLarge(item, data.uploadUrl, item.size)
  } else {
    // 小文件
    uploadResponse = await uploadSmall(item, fullPath, token)
  }
  if (!uploadResponse.data.id) {
    return { status: 403, message: '上传失败' }
  }
  const { data } = await getShareId(uploadResponse.data.id, token)
  const url = genShareUrl(data.shareId)
  return { status: 200, url: url, id }
}
