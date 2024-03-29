import store from '../store/index'
function catbox () {}
catbox.uploadImage = async (item, id) => {
  const formData = new FormData()
  formData.append('fileToUpload', item)
  formData.append('reqtype', 'fileupload')
  const { userhash } = store.state.oss.catbox
  if (userhash) {
    formData.append('userhash', userhash)
  }
  return await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: formData
  }).then(res => res.text())
    .then(res => {
      return { status: 200, url: res, id }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default catbox
