import store from '../store/index'
import Utils from '@/js/Utils'
const branchReg = /ref=(.*)/
function GitHub () {}

GitHub.uploadImage = (item, id) => {
  return new Promise((resolve, reject) => {
    const format = store.state.oss.GitHub.format
    const fileName = format ? Utils.getImageSavePath(format, item.name) : `${Date.now()}-${item.name}`
    const fr = new FileReader()
    fr.readAsDataURL(item)
    fr.onloadend = (e) => {
      const base64 = e.target.result.split(',')[1]
      console.log(base64)
      const GitHub = store.state.oss.GitHub
      const data = {
        message: '图床',
        content: base64
      }
      if (GitHub.branch) {
        data.branch = GitHub.branch
      }
      const requestUrl = `https://api.github.com/repos/${GitHub.project}/contents${GitHub.path}/${fileName}`
      fetch(requestUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `token ${GitHub.token}`
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
              baseUrl = `${GitHub.project}@${RegExp.$1}/${path}`
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
