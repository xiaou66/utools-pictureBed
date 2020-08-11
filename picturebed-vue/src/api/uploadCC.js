function uploadCC () {}
uploadCC.uploadImage = async (item, id) => {
  const formData = new FormData()
  formData.append('uploaded_file[]', item)
  // code == 100 失败
  return await fetch('https://upload.cc/image_upload', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.total_error === 0) {
        return { status: 200, url: `https://upload.cc/${res.success_image[0].url}`, id }
      } else {
        return { status: 403, message: '上传失败' }
      }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default uploadCC
