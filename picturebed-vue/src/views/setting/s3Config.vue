<template>
  <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="endpoint" >
      <a-input placeholder="请输入 endpoint" v-model="oss.s3.endpoint"></a-input>
    </a-form-item>
    <a-form-item label="endpoint 访问方式" >
      <a-select v-model="oss.s3.forcePathStyle" :options="[{value: false,label: '虚拟主机(Virtual Hosted Style)'},{value:true,label:'路径访问(Path Style)'}]"></a-select>
    </a-form-item>
    <a-form-item label="accessKeyId" >
      <a-input placeholder="请输入 accessKeyId"
               type="password"
               v-model="oss.s3.accessKeyId"></a-input>
    </a-form-item>
    <a-form-item label="secretAccessKey" >
      <a-input placeholder="请输入 secretAccessKey"
               type="password"
               v-model="oss.s3.secretAccessKey"></a-input>
    </a-form-item>
    <a-form-item label="region" >
      <a-input placeholder="请输入 region"
               v-model="oss.s3.region"></a-input>
    </a-form-item>
    <a-form-item label="bucket" >
      <a-input placeholder="bucket"
               v-model="oss.s3.bucket"></a-input>
    </a-form-item>
    <a-form-item label="自定义域名" >
      <a-input placeholder="bucket"
               v-model="oss.s3.baseUrl"></a-input>
    </a-form-item>
    <a-form-item label="version" >
      <a-input placeholder="api 版本号"
               v-model="oss.s3.version"></a-input>
    </a-form-item>
    <a-form-item label="文件名格式" >
      <a-tooltip placement="topLeft">
        <template #title>
          配置后需要保持文件唯一性如果不唯一则将会上传失败
          {Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {ms}: 毫秒{rand}:随机字符串{filename}:文件名称{suffix}:文件后缀{since_millisecond}毫秒时间戳{since_second}秒时间戳
        </template>
        <a-input placeholder="上传目录例如: abc/test/ {Y}:年 {MM}:月 {DD}:日 {H}:时 {m}:分 {s}:秒 {rand}:随机字符串 [可选]"
                 v-model="oss.s3.path"></a-input>
      </a-tooltip>
    </a-form-item>
  </a-form>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['oss'])
  },
  methods: {
  }
}
</script>
<style scoped>

</style>
