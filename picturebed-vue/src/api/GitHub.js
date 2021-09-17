import store from '../store/index'
import Utils from '@/js/Utils'
const branchReg = /ref=(.*)/
function GitHub () {}
const Path = require('path')
GitHub.uploadImage = (item, id) => {
  return new Promise((resolve, reject) => {
    const { path, project, token, branch } = store.state.oss.GitHub
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
          if (res.content && res.content.download_url) {
            // https://raw.githubusercontent.com/xiaou66/picture/master/1597318943475-logo.png
            // https://cdn.jsdelivr.net/gh/xiaou66/picture/master/1597318943475-logo.png
            // 超过 20 MB 不使用 jsdelivr cdn
            if (item.size >= 20 * 1024 * 1024) {
              resolve({ status: 200, url: res.content.download_url, id })
            } else {
              debugger
              let baseUrl = ''
              const { path, url } = res.content
              branchReg.test(url)
              console.log(RegExp.$1)
              baseUrl = `${project}@${RegExp.$1}/${path}`
              // /xiaou66/pic/image/1609054282923-86467220_p0.png
              const jsdelivrUrl = `https://cdn.jsdelivr.net/gh/${baseUrl}`
              resolve({ status: 200, url: jsdelivrUrl, id })
            }
          } else {
            resolve({ status: 403, message: '上传失败' })
          }
        }).catch(() => {
          resolve({ status: 403, message: '上传失败' })
        })
    }
  })
}
export default GitHub
