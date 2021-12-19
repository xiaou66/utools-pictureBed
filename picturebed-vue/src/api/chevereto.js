import store from '../store/index'
export default async (item, id) => {
  const { token, url } = store.state.oss.chevereto
  const fromData = new FormData()
  fromData.append('key', token)
  fromData.append('format', 'txt')
  fromData.append('source', item)
  return await fetch(`${url}api/1/upload`, {
    method: 'POST',
    body: fromData
  }).then(res => res.text())
    .then(res => {
      if (!res.startsWith('http')) {
        return { code: 403, message: res }
      }
      return { status: 200, url: res, id }
    }).catch(() => {
      return { code: 403, message: '上传失败' }
    })
}
