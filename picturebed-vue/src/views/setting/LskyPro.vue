<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="服务地址" require>
        <a-input placeholder="https://pic.iqy.ink" v-model="oss.lskyPro.servicePath"></a-input>
      </a-form-item>
      <a-form-item label="token" require>
        <a-input placeholder="请输入 API token" v-model="oss.lskyPro.token"></a-input>
      </a-form-item>
      <a-form-item label="存储策略" >
        <a-input placeholder="[可选]填存储策略的编号" v-model="oss.lskyPro.strategyId"></a-input>
      </a-form-item>
    </a-form>
    <a-row type="flex" justify="center">
      <a-button @click="getToken">使用手册</a-button>
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
      window.openUrl('https://www.lsky.pro/')
    }
  }
}
</script>

<style scoped>

</style>
