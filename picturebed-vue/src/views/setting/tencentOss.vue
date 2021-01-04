<template>
  <div style="margin-bottom: 30px;">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="region" >
        <a-input placeholder="region" v-model="oss.tencentOss.region"></a-input>
      </a-form-item>
      <a-form-item label="secretId">
        <a-input placeholder="SecretId" v-model="oss.tencentOss.secretId"></a-input>
      </a-form-item>
      <a-form-item label="secretKey" >
        <a-input placeholder="secretKey" v-model="oss.tencentOss.secretKey"></a-input>
      </a-form-item>
      <a-form-item label="bucket">
        <a-input placeholder="bucket" v-model="oss.tencentOss.bucket"></a-input>
      </a-form-item>
      <a-form-item label="path">
        <a-input placeholder="image/ [可留空上传到根目录]" v-model="oss.tencentOss.path"></a-input>
      </a-form-item>
      <a-form-item label="自定义域名">
        <a-input placeholder="自定义域名例如：img.example.com [可选]" v-model="oss.tencentOss.domain"></a-input>
      </a-form-item>
      <a-form-item label="图片样式">
        <a-input placeholder="例如：thumbnail/!50p，需要域名支持数据万象 [可选]" v-model="oss.tencentOss.style"></a-input>
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
      window.openUrl('https://cloud.tencent.com/document/product/436/13318')
      window.openUrl('https://cloud.tencent.com/document/product/436/7751')
    }
  }
}
</script>

<style scoped>

</style>
