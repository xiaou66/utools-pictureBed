<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="access_token" >
       <a-tooltip placement="topLeft">
         <template #title>
           用户授权码
         </template>
         <a-input placeholder="access_token" v-model="oss.Gitee.accessToken"></a-input>
       </a-tooltip>
      </a-form-item>
      <a-form-item label="owner">
        <a-input placeholder="仓库所属空间地址(企业、组织或个人的地址path)" v-model="oss.Gitee.owner"></a-input>
      </a-form-item>
      <a-form-item label="repo">
        <a-input placeholder="仓库路径(path)" v-model="oss.Gitee.repo"></a-input>
      </a-form-item>
      <a-form-item label="path">
        <a-tooltip placement="topLeft">
          <template #title>
            配置后需要保持文件唯一性如果不唯一则将会上传失败
            {Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {ms}: 毫秒{rand}:随机字符串{filename}:文件名称{suffix}:文件后缀{since_millisecond}毫秒时间戳{since_second}秒时间戳
          </template>
          <a-input placeholder="上传目录例如: abc/test/ {Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {rand}:随机字符串 [可选]" v-model="oss.Gitee.path"></a-input>
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
      window.openUrl('https://www.aliyun.com/product/oss')
      window.openUrl('https://help.aliyun.com/document_detail/64097.html')
    }
  }
}
</script>

<style scoped>

</style>
