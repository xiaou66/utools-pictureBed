const oss = {
  state: {
    aliOss: {
      region: '',
      accessKeyId: '',
      accessKeySecret: '',
      bucket: ''
    },
    tencentOss: {
      secretId: '',
      secretKey: '',
      bucket: '',
      region: ''
    },
    rruu: {
      token: ''
    },
    GitHub: {
      token: '',
      path: '',
      project: '',
      cdn: ''
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
