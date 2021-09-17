const path = require('path')
function Utils () {}

Utils.getImageSavePath = (formatPath, fileName) => {
  debugger
  /**
   * 允许格式化的关键词
   * @type {string[]} Y-年 M-月 D-日 H-时 m-分 s-秒 rand-10位 随机字符串
   */
  const enableKeywords = ['Y', 'M', 'D', 'H', 'm', 's', 'rand', 'ms', 'filename', 'suffix', 'since_millisecond', 'since_second']
  const date = new Date()
  const suffix = path.extname(fileName).replace()
  const filename = path.basename(fileName).replace(suffix, '')
  const option = {
    Y: date.getFullYear().toString(),
    M: (date.getMonth() + 1).toString(),
    D: date.getDate().toString(),
    H: date.getHours().toString(),
    m: date.getMinutes().toString(),
    s: date.getSeconds().toString(),
    ms: date.getMilliseconds().toString(),
    rand: Math.random().toString(36).slice(-10),
    since_millisecond: Date.now(),
    since_second: Math.round(Date.now() / 1000),
    filename,
    suffix: suffix.replace('.', '')
  }
  const rewrite = formatPath.includes('filename')
  for (const key of enableKeywords) {
    if (option[key]) {
      formatPath = formatPath.replace(new RegExp('\\{' + key + '\\}', 'g'), option[key])
    }
  }
  if (rewrite) {
    return formatPath
  }
  return formatPath + fileName
}
console.log(Utils.getImageSavePath('{rand}-', 'aaa.png'))
// export default Utils
