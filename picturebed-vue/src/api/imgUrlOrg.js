function imgUrlOrg () {}
imgUrlOrg.uploadImage = async (item, id) => {
  const formData = new FormData()
  formData.append('file', item)
  return await fetch('https://imgurl.org/upload/ftp', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      return { status: 200, url: res.url, id }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default imgUrlOrg
