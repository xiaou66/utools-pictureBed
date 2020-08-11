<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="region" >
        <a-input placeholder="region" v-model="oss.aliOss.region"></a-input>
      </a-form-item>
      <a-form-item label="accessKeyId">
        <a-input placeholder="accessKeyId" v-model="oss.aliOss.accessKeyId"></a-input>
      </a-form-item>
      <a-form-item label="accessKeySecret" >
        <a-input placeholder="accessKeySecret" v-model="oss.aliOss.accessKeySecret"></a-input>
      </a-form-item>
      <a-form-item label="bucket">
        <a-input placeholder="bucket" v-model="oss.aliOss.bucket"></a-input>
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
