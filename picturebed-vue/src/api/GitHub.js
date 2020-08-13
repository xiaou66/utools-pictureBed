import store from '../store/index'
function GitHub () {}
GitHub.uploadImage = (item, id) => {
  console.log('g', item)
  return new Promise((resolve, reject) => {
    const fileName = `${Date.now()}-${item.name}`
    const fr = new FileReader()
    fr.readAsDataURL(item)
    fr.onloadend = (e) => {
      const base64 = e.target.result.split(',')[1]
      console.log(base64)
      const data = {
        message: '图床',
        content: base64
      }
      fetch(`https://api.github.com/repos/${store.state.oss.GitHub.project}/contents${store.state.oss.GitHub.path}/${fileName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: `token ${store.state.oss.GitHub.token}`
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => {
          if (res.content && res.content.download_url) {
            // https://raw.githubusercontent.com/xiaou66/picture/master/1597318943475-logo.png
            // https://cdn.jsdelivr.net/gh/xiaou66/picture/master/1597318943475-logo.png
            if (item.size >= 20 * 1024) {
              resolve({ status: 200, url: res.content.download_url, id })
            } else {
              const baseUrl = res.content.download_url.replace('/master/', '/').replace('https://raw.githubusercontent.com', '')
              const jsdelivrUrl = `https://cdn.jsdelivr.net/gh${baseUrl}`
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
