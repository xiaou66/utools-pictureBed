function Utils () {}

Utils.getImageSavePath = (formatPath, filename) => {
  /**
   * 允许格式化的关键词
   * @type {string[]} Y-年 M-月 D-日 H-时 m-分 s-秒 rand-10位 随机字符串
   */
  const enableKeywords = ['Y', 'M', 'D', 'H', 'm', 's', 'rand']
  const date = new Date()
  const option = {
    Y: date.getFullYear().toString(),
    M: (date.getMonth() + 1).toString(),
    D: date.getDate().toString(),
    H: date.getHours().toString(),
    m: date.getMinutes().toString(),
    s: date.getSeconds().toString(),
    rand: Math.random().toString(36).slice(-10)
  }
  for (const key of enableKeywords) {
    if (option[key]) {
      console.log(key)
      formatPath = formatPath.replace(new RegExp('\\{' + key + '\\}', 'g'), option[key])
    }
  }
  return formatPath + filename
}

export default Utils
