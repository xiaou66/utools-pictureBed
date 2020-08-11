<template>
  <div>
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
