import store from '../store/index'
function Hello () {}
Hello.uploadImage = async (item, id) => {
  const formData = new FormData()
  const { username, password } = store.state.oss.Hello
  formData.append('source', item)
  formData.append('login-subject', username)
  formData.append('password', password)
  return await fetch('https://www.helloimg.com/newapi/2/upload/?format=json', {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      if (res.status_code !== 200) {
        return { status: 403, message: res.error.message }
      }
      const { url } = res.image
      return { status: 200, url, id }
    }).catch(() => {
      return { status: 403, message: '上传失败' }
    })
}
export default Hello
