import ossData from '@/data/oss_data.json'
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
      path: '',
      domain: '',
      style: ''
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
    setAliOss (state, {
      region,
      accessKeyId,
      accessKeySecret,
      bucket
    }) {
      state.aliOss = {
        region, accessKeyId, accessKeySecret, bucket
      }
    },
    clearOssData (state, keys = []) {
      keys.forEach(key => {
        state[key] = ossData[key]
      })
    }
  },
  actions: {
  },
  getters: { }
}

export default oss
