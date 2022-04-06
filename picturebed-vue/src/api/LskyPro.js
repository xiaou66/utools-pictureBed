import store from '../store/index'
function LskyPro () {}
LskyPro.uploadImage = async (item, id) => {
  const { servicePath, token = '', strategyId } = store.state.oss.lskyPro
  if (!servicePath) {
    return { status: 403, message: '上传失败配置读取不正确,可以重启插件再试' }
  }
  const formData = new FormData()
  formData.append('file', item)
  formData.append('strategy_id', strategyId)
  return await fetch(servicePath + '/api/v1/upload', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res.json())
    .then(res => {
      if (res.status) {
        return { status: 200, url: res.data.links.url, id }
      }
      return { status: 403, message: res.msg }
    })
}
export default LskyPro
