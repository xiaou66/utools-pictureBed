<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="accessKey" >
       <a-tooltip placement="topLeft">
         <a-input placeholder="access_token" v-model="oss.Qiniu.accessKey"></a-input>
       </a-tooltip>
      </a-form-item>
      <a-form-item label="secretKey">
        <a-input placeholder="secretKey" v-model="oss.Qiniu.secretKey"></a-input>
      </a-form-item>
      <a-form-item label="bucket">
        <a-input placeholder="bucket" v-model="oss.Qiniu.bucket"></a-input>
      </a-form-item>
      <a-form-item label="区域">
        <a-select v-model="oss.Qiniu.zone">
          <a-select-option value="Zone_z0">华东</a-select-option>
          <a-select-option value="Zone_z1">华北</a-select-option>
          <a-select-option value="Zone_z2">华南</a-select-option>
          <a-select-option value="Zone_na0">北美</a-select-option>
          <a-select-option value="Zone_as0">东南亚</a-select-option>
          <a-select-option value="Zone_cn-east-2">华东-浙江2</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="使用cdn加速">
        <a-switch v-model="oss.Qiniu.cdn"></a-switch>
      </a-form-item>
      <a-form-item label="path">
        <a-tooltip placement="topLeft">
          <template #title>
            配置后需要保持文件唯一性如果不唯一则将会上传失败
            {Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {ms}: 毫秒{rand}:随机字符串{filename}:文件名称{suffix}:文件后缀{since_millisecond}毫秒时间戳{since_second}秒时间戳
          </template>
          <a-input placeholder="上传目录例如: abc/test/ {Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {rand}:随机字符串 [可选]" v-model="oss.Qiniu.path"></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="域名">
        <a-tooltip placement="topLeft">
          <template #title>
           必选配置需要带 http 或 https
          </template>
          <a-input placeholder="带 http 或 https" v-model="oss.Qiniu.host"></a-input>
        </a-tooltip>
      </a-form-item>
    </a-form>
    <a-row type="flex" justify="center">
      <a-button @click="getToken">怎么获取这些信息</a-button>
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
      window.openUrl('https://portal.qiniu.com/kodo/bucket')
      window.openUrl('https://portal.qiniu.com/user/key')
    }
  }
}
</script>

<style scoped>

</style>
