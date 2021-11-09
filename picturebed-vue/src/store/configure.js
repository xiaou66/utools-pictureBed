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
    }
  },
  mutations: {
  },
  actions: {
  },
  getters: { }
}

export default configure
