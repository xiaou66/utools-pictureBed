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
async function getBusinessImageUrl (url) {
  const res = await window.utools.ubrowser.goto(url)
    .wait('#appRoot')
    .evaluate(() => {
      document.cookie = ''
      localStorage.clear()
      indexedDB.deleteDatabase('ODSP_DB')
      indexedDB.deleteDatabase('Route.Config')
      return document.getElementsByTagName('html')[0].outerHTML
    }).clearCookies().hide().run({ show: false })
  console.log(res[0])
  if (res && res.length) {
    const html = res[0]
    const [mediaBaseUrlOri] = html.match(/mediaBaseUrl".+?\.ms/)
    const mediaBaseUrl = 'https://' + mediaBaseUrlOri.split('u002f')[2] + '/'

    // const [mediaBaseUrlSecondaryOri] = html.match(/'mediaBaseUrlSecondary".+?\.ms'/)
    // const mediaBaseUrlSecondary = 'https://' + mediaBaseUrlSecondaryOri[0].split('u002f')[2] + '/'

    const [providerOri] = html.match(/\?provider.+&i/)
    const provider = providerOri.split('=')[1].split('&')[0]

    const [fileTypeOri] = html.match(/%2E.[a-z|A-Z]+&/)
    const fileType = fileTypeOri.split('&')[0].split('2E')[1]
    //
    const [callerStackOri] = html.match(/callerStack" : ".+[a-z|A-Z]/)
    const callerStack = callerStackOri.split('"')[2]
    //
    const [currentFolderSpItemUrlOri] = html.match(/CurrentFolderSpItemUrl.+/)
    const currentFolderSpItemUrl = currentFolderSpItemUrlOri.split('"')[2]
    const [accessTokenOri] = html.match(/driveAccessToken":"access_token.+","/)
    const accessToken = accessTokenOri.split('"')[2].split('=')[1]
    const transformUrl = mediaBaseUrl + 'transform/thumbnail?provider=' + provider +
      '&inputFormat=' + fileType + '&cs=' + callerStack + '&docid=' + currentFolderSpItemUrl +
      '&access_token=' + accessToken + '&width=1000000000000&height=1000000000000&encodeFailures=1&action=Access'
    // console.log(mediaBaseUrl)
    // console.log(mediaBaseUrlSecondary)
    // console.log(provider)
    // console.log(fileType)
    // console.log(callerStack)
    // console.log(currentFolderSpItemUrl)
    // console.log(accessToken)
    return transformUrl
  }
  return ''
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
  let url = ''
  if (data.shareId) {
    url = genShareUrl(data.shareId)
  } else if (data.link && data.link.webUrl) {
    url = await getBusinessImageUrl(data.link.webUrl)
  }
  if (!url) {
    return { status: 403, message: '上传失败' }
  }
  return { status: 200, url: url, id }
}
