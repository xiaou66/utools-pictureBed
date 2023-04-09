<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="刷新Token" >
        <a-row :gutter="8">
          <a-col :span="20">
            <a-input placeholder="自动获取" v-model="oss.onedrive.refreshToken" :disabled="true">
            </a-input>
          </a-col>
          <a-col :span="4">
            <a-button @click="authorization">
              授权
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="目录">
        <a-tooltip placement="topLeft">
          <template #title >
            {Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {rand}:随机字符串 [可选]
          </template>
          <a-input placeholder="上传目录例如: abc/test/ {Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {rand}:随机字符串 [可选]"
                   v-model="oss.onedrive.path">
          </a-input>
        </a-tooltip>
      </a-form-item>
    </a-form>
    <a-row type="flex" justify="center">
      <a-button @click="cancelAuthorization" style="margin-right: 10px;">取消授权</a-button>
      <a-button @click="clearRefreshToken">清空刷新Token</a-button>
    </a-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'onedrive',
  computed: {
    ...mapState(['oss'])
  },
  methods: {
    cancelAuthorization () {
      window.utools.shellOpenExternal('https://account.live.com/consent/Manage')
    },
    clearRefreshToken () {
      this.oss.onedrive.refreshToken = ''
    },
    async authorization () {
      const res = await window.utools.ubrowser.goto('https://utools.on-u.cn/music/microsoftGraph/auth')
        .wait('pre', 10 * 60 * 1000)
        .evaluate(() => {
          return JSON.parse(document.querySelector('pre').textContent)
        })
        .clearCookies()
        .hide()
        .run({})
      window.utools.clearUBrowserCache()
      if (res && res.length) {
        const { status, message, data } = res[0]
        if (status !== 200) {
          this.$message.warning(message)
          return
        }
        if (!data.refresh_token) {
          this.$message.success('授权失败')
          return
        }
        this.oss.onedrive.refreshToken = data.refresh_token
        this.$Cache.set('onedrive_token', data.access_token, 50 * 60)
        this.$message.success('授权成功')
      }
    }
  }
}
</script>

<style scoped>

</style>
