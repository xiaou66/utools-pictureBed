import store from '../store/index'
const preMusic = 'xiaou-bookmark-'
// 更新兼容
// 同步用户
// const syncKey = ['setting', 'command', 'user']
// 普通用户
const comKey = ['oss', 'image', 'configure']

function uToolsUtils () {}
uToolsUtils.save = (...keys) => {
  keys.map((key) => {
    const data = store.state[key]
    update(key, data)
  })
}
uToolsUtils.readAll = () => {
  console.log('load....')
  uToolsUtils.read(...comKey)
}
uToolsUtils.read = (...keys) => {
  keys.map((key) => {
    const data = read(key)
    console.log(key)
    console.log(data)
    if (data) {
      store.state[key] = data
    }
  })
}
/**
 * 删除 key
 */
// eslint-disable-next-line no-unused-vars
function deleteItem (key) {
  // eslint-disable-next-line no-undef
  utools.db.remove(`${preMusic}${key}`)
}
/**
 * 获得 数据
 */
function read (key, onlyData = true) {
  // eslint-disable-next-line no-undef
  const data = utools.db.get(`${preMusic}${key}`)
  console.log(data)
  if (!data) {
    return false
  }
  if (onlyData) {
    return data.data
  } else {
    return data
  }
}
/**
 * 更新数据
 */
function update (key, data) {
  const readData = read(key, false)
  let res
  if (!readData) {
    // eslint-disable-next-line no-undef
    res = utools.db.put({
      _id: `${preMusic}${key}`,
      data: data,
      _rev: readData._rev
    })
  } else {
    // eslint-disable-next-line no-undef
    res = utools.db.put({
      _id: `${preMusic}${key}`,
      data: data,
      _rev: readData._rev
    })
  }
  console.log('update' + res.toString())
}

window.saveALL = () => {
  console.log('保存')
  uToolsUtils.save(...comKey)
}
uToolsUtils.playPromptTone = (fileName, pre = false) => {
  const audio = new Audio()
  audio.loop = false
  if (pre) {
    audio.play()
    let fig = true
    audio.addEventListener('ended', function () {
      if (fig) {
        audio.src = `https://xiaou520.gitee.io/sound/${fileName}`
        audio.play()
        fig = false
      }
    }, false)
  } else {
    audio.src = `https://xiaou520.gitee.io/sound/${fileName}`
    audio.play()
  }
}
uToolsUtils.isNewVersion = () => {
  // 当前版本
  const pluginInfo = window.pluginInfo
  console.log(pluginInfo)
  // utools 自动更新数据处理
  if (read('version') !== pluginInfo.version) {
    uToolsUtils.playPromptTone('update.wav')
    // 是否需要更新数据
    if (window.pluginInfo.update) {
      console.log('更新数据')
      const oldOss = read('oss')
      if (oldOss) {
        const oldOsskeys = oldOss
        const newOssKeys = store.state.oss
        newOssKeys.aliOss = oldOsskeys.aliOss
        newOssKeys.tencentOss = oldOsskeys.tencentOss
        newOssKeys.rruu = oldOsskeys.rruu
        uToolsUtils.save('oss')
      }
    }
    update('version', pluginInfo.version)
    // 打开更新信息窗口
    window.createUpdateWindow()
    return true
  } else {
    console.log('false')
    return false
  }
}
export default uToolsUtils
