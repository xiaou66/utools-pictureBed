function onji () {}
const allNode = [
  { name: '腾讯', path: 'tencent' },
  { name: '京东', path: 'jd' },
  { name: 'QQ', path: 'qq' },
  { name: '阿里', path: 'ali' },
  { name: '网易', path: 'wangyi' },
  { name: '头条', path: 'toutiao' },
  { name: '抖音', path: 'douyin' },
  { name: '美团', path: 'mt' },
  { name: '百度', path: 'baidu' },
  { name: '携程', path: 'xc' },
  { name: '搜狐', path: 'souhu' },
  { name: '快手', path: 'ks' },
  { name: '百度', path: 'baidu' },
  { name: '苏宁', path: 'suning' }
]
onji.uploadImage = async (item, id, nodeName) => {
  debugger
  const node = allNode.find(item => item.name === nodeName)
  if (!node) {
    return { status: 403, message: '上传失败' }
  }
  const formData = new FormData()
  formData.append('image', item)
  formData.append('file_id', 0)
  return await fetch(`https://pic.onji.cn/api/${node.path}.php`, {
    method: 'POST',
    body: formData
  }).then(res => res.json())
    .then(res => {
      const { code, data } = res
      if (code !== 200 || data.url.includes('失效')) {
        return { status: 403, message: '上传失败' }
      }
      if (node.name === '网易') {
        data.url = data.url.replace('<ourl>', '')
      }
      debugger
      return { status: 200, url: `${data.url}`, id }
    })
}
export default onji
