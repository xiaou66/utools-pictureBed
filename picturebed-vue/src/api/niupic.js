function niupic () {}
niupic.uploadImage = async (item, id) => {
  const formData = new FormData()
  formData.append('image_field', item)
  return await fetch('https://www.niupic.com/index/upload/process', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return { status: 200, url: `https://${res.data}`, id }
      } else {
        return { status: 403, message: '上传失败' }
      }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default niupic
