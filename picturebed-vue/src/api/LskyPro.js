import store from '../store/index'
function LskyPro () {}
LskyPro.uploadImage = async (item, id) => {
  const { servicePath, token = '' } = store.state.oss.lskyPro
  if (!servicePath) {
    return { status: 403, message: '上传失败配置读取不正确,可以重启插件再试' }
  }
  const formData = new FormData()
  formData.append('image', item)
  return await fetch(servicePath + '/api/upload', {
    method: 'POST',
    body: formData,
    headers: {
      token
    }
  }).then(res => res.json())
    .then(res => {
      if (res.code === 200) {
        return { status: 200, url: res.data.url, id }
      }
      return { status: 403, message: res.msg }
    })
}
export default LskyPro
