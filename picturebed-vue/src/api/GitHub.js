import store from '../store/index'
// eslint-disable-next-line import/no-duplicates
import Utils from '@/js/Utils'
const branchReg = /ref=(.*)/
function GitHub () {}
const Path = require('path')
GitHub.uploadImage = (item, id) => {
  return new Promise((resolve, reject) => {
    const { path, project, token, branch, formatPath = '' } = store.state.oss.GitHub
    const fileName = Utils.getImageSavePath(path, item.name, { timestamp: true })
    const fr = new FileReader()
    fr.readAsDataURL(item)
    fr.onloadend = (e) => {
      const base64 = e.target.result.split(',')[1]
      const data = {
        message: '图床',
        content: base64
      }
      if (branch) {
        data.branch = branch
      }
      const baseUrl = `api.github.com/repos/${project}/contents/`
      const requestUrl = `https://${Path.join(baseUrl, fileName)}`
      fetch(requestUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `token ${token}`
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          const { path, url } = res.content
          branchReg.test(url)
          if (formatPath) {
            const params = {
              branch: RegExp.$1,
              uploadPath: path,
              project
            }
            console.log('params', params)
            console.log(formatPath)
            const uploadPath = Utils.formatPath(formatPath, params)
            resolve({ status: 200, url: uploadPath, id })
          } else {
            // region 默认逻辑 >= 20MB 文件使用 GitHub 直连 < 20MB 使用 jsdelivr CDN 加速
            if (res.content && res.content.download_url) {
              if (item.size >= 20 * 1024 * 1024) {
                resolve({ status: 200, url: res.content.download_url, id })
              } else {
                let baseUrl = ''
                baseUrl = `${project}@${RegExp.$1}/${path}`
                // /xiaou66/pic/image/1609054282923-86467220_p0.png
                const jsdelivrUrl = `https://fastly.jsdelivr.net/gh/${baseUrl}`
                resolve({ status: 200, url: jsdelivrUrl, id })
              }
            } else {
              resolve({ status: 403, message: '上传失败' })
            }
          }
        }).catch(() => {
          resolve({ status: 403, message: '上传失败' })
        })
    }
  })
}
export default GitHub
