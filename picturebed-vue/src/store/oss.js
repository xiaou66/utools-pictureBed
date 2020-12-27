const oss = {
  state: {
    aliOss: {
      region: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: '',
      uploadDirectory: '',
      domain: '',
      style: ''
    },
    tencentOss: {
      secretId: '',
      secretKey: '',
      bucket: '',
      region: '',
      path: ''
    },
    rruu: {
      token: ''
    },
    smMs: {
      token: ''
    },
    GitHub: {
      token: '',
      path: '',
      project: '',
      cdn: '',
      branch: '',
      at: false
    }
  },
  mutations: {
    setAliOss (store, {
      region,
      accessKeyId,
      accessKeySecret,
      bucket
    }) {
      store.aliOss = {
        region, accessKeyId, accessKeySecret, bucket
      }
    }
  },
  actions: {
  },
  getters: { }
}

export default oss
