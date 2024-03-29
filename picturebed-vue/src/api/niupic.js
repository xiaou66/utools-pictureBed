function niupic () {}
niupic.uploadImage = async (item, id) => {
  const formData = new FormData()
  formData.append('file', item)
  return await fetch('https://www.niupic.com/api/upload', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return { status: 200, url: `${res.data}`, id }
      } else {
        return { status: 403, message: '上传失败' }
      }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default niupic
