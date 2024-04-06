import store from '../store/index'
function Hello () {}
Hello.uploadImage = async (item, id) => {
  const formData = new FormData()
  const { token, permission, strategyId } = store.state.oss.Hello
  formData.append('file', item)
  formData.append('permission', permission)
  formData.append('strategy_id', strategyId)
  return await fetch('https://pro.helloimg.com/api/v1/upload', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    }
  }).then(res => res.json())
    .then(res => {
      if (res.status !== true) {
        return { status: 403, message: res.message }
      }
      const { url } = res.data.links
      console.log('Hello', url)
      return { status: 200, url, id }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default Hello
