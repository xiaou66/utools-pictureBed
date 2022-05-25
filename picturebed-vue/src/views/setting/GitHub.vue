<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="token" >
        <a-input placeholder="请输入 token" v-model="oss.GitHub.token"></a-input>
      </a-form-item>
      <a-form-item label="仓库名" >
        <a-tooltip placement="topLeft">
          <template #title>
            仓库至少要存在一个文件例:「xiaou/picture」
          </template>
          <a-input placeholder="例: xiaou/picture" v-model="oss.GitHub.project"></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="path" >
        <a-tooltip placement="topLeft">
          <template #title>
            配置后需要保持文件唯一性如果不唯一则将会上传失败
            {Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {ms}: 毫秒{rand}:随机字符串{filename}:文件名称{suffix}:文件后缀{since_millisecond}毫秒时间戳{since_second}秒时间戳
          </template>
          <a-input placeholder="例: /image 或 /img/images [可留空上传到根目录]" v-model="oss.GitHub.path"></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="branch" >
        <a-tooltip placement="topLeft">
          <template #title>
            设置图片要上传到的分支
          </template>
          <a-input placeholder="[留空>>使用仓库默认分支(通常是 master)]" v-model="oss.GitHub.branch"></a-input>
        </a-tooltip>
      </a-form-item>
    </a-form>
    <a-row type="flex" justify="center">
      <a-button @click="fixHostHandler">修复</a-button>
    </a-row>
    <a-row type="flex" justify="center">
      <a-tooltip>
        <template #title>
          主要需要 repo权限 具体权限自行设置
        </template>
        <a-button @click="getToken">怎么获取token</a-button>
      </a-tooltip>
    </a-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['oss'])
  },
  methods: {
    getToken () {
      window.openUrl('https://github.com/settings/tokens/new')
    },
    fixHostHandler () {
      this.$store.commit('picUrlGitHubFix')
      this.$message.success('修复完成, 需要重启插件')
    }
  }
}
</script>

<style scoped>

</style>
