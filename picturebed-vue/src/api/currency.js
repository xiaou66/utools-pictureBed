function currency () {}
currency.uploadImage = async (item, id) => {
  const formData = new FormData()
  formData.append('file', item)
  return await fetch('', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.status === 200 || res.code === 200) {
        return { status: 200, url: res.data.url, id }
      } else {
        return { status: 403, message: '上传失败' }
      }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default currency
