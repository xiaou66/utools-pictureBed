const configure = {
  state: {
    dataSavePath: '',
    autoSave: {
      enable: false,
      interval: 10,
      prevSaveTime: ''
    },
    autoCopy: {
      mode: 'url',
      enabled: false
    },
    timeStamp: false,
    interconnect: {
      port: 33438,
      status: false
    },
    // 服务
    webService: {
      port: 4126,
      status: false
    },
    // 水印
    watermark: {
      status: false,
      position: 'topLeft',
      image: ''
    },
    customUrl: {
      hide1: 'MD笔记',
      value1: ''
    },
    // 压缩图片
    compress: {
      maxSizeMB: 5,
      status: false,
      exclude: [],
      size: 10
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: { }
}

export default configure
