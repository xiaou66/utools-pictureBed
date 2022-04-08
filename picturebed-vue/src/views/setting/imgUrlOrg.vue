<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="服务地址">
        <a-input placeholder="默认 https://www.imgurl.org" v-model="oss.imgUrlOrg.host"></a-input>
      </a-form-item>
      <a-form-item label="uid" >
        <a-input placeholder="通过 ImgURL 后台获取" v-model="oss.imgUrlOrg.uid"></a-input>
      </a-form-item>
      <a-form-item label="token" require>
        <a-input placeholder="通过 ImgURL 后台获取" v-model="oss.imgUrlOrg.token"></a-input>
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
      window.openUrl('https://doc.xiaoz.me/books/imgurl-pro/page/api')
    }
  }
}
</script>

<style scoped>

</style>
