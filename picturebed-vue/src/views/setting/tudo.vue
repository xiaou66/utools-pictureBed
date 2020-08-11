<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="token" >
        <a-input placeholder="请输入 token" v-model="oss.tudo.token"></a-input>
      </a-form-item>
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
      window.openUrl('https://images.ac.cn/')
    }
  }
}
</script>

<style scoped>

</style>
