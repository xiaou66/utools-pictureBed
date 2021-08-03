import store from '../store/index'
export default async (item, id) => {
  const { token, url } = store.state.oss.chevereto
  const fromData = new FormData()
  fromData.append('key', token)
  fromData.append('format', 'json')
  fromData.append('source', item)
  return await fetch(`${url}api/1/upload`, {
    method: 'POST',
    body: fromData
  }).then(res => res.json())
    .then(res => {
      if (res.status_code !== 200) {
        return { code: 403, message: res.error.message }
      }
      return { status: 200, url: res.image.display_url, id }
    }).catch(() => {
      return { code: 403, message: '上传失败' }
    })
}
