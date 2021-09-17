import store from '@/store'
import Utils from '@/js/Utils'
function Gitee () {}
Gitee.uploadImage = (item, id) => {
  return new Promise((resolve, reject) => {
    const { accessToken, owner, repo, path } = store.state.oss.Gitee
    console.log(item.path)
    const newPath = Utils.getImageSavePath(path, item.name, { timestamp: true })
    const fr = new FileReader()
    fr.readAsDataURL(item)
    fr.onloadend = (e) => {
      const base64 = e.target.result.split(',')[1]
      const body = {
        access_token: accessToken,
        content: base64,
        message: '图床'
      }
      fetch(`https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${newPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => res.json())
        .then(res => {
          // eslint-disable-next-line camelcase
          const { download_url } = res.content
          resolve({ status: 200, url: download_url, id })
        }).catch(e => {
          resolve({ status: 403, message: '上传失败' })
        })
    }
  })
}
export default Gitee
