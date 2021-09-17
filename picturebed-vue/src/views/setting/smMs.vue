<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="token" >
        <a-input placeholder="请输入 API token" v-model="oss.smMs.token"></a-input>
      </a-form-item>
<!--      <a-form-item label="文件格式">-->
<!--        <a-tooltip placement="topLeft">-->
<!--          <template #title>-->
<!--            {Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {ms}: 毫秒{rand}:随机字符串{filename}:文件名称{suffix}:文件后缀{since_millisecond}毫秒时间戳{since_second}秒时间戳-->
<!--          </template>-->
<!--          <a-input placeholder="" v-model="oss.smMs.format"></a-input>-->
<!--        </a-tooltip>-->
<!--      </a-form-item>-->
    </a-form>
    <a-row type="flex" justify="center">
      <a-button @click="getToken">怎么获取token</a-button>
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
      window.openUrl('https://sm.ms/login')
    }
  }
}
</script>

<style scoped>

</style>
