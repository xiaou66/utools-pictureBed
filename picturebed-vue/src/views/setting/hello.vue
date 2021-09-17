<template>
  <div>
    <div style="min-height: 100%">
      <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="用户名或邮箱" >
          <a-input placeholder="请输入 用户名或邮箱" v-model="oss.Hello.username"></a-input>
        </a-form-item>
        <a-form-item label="密码" >
          <a-input-password placeholder="请输入密码" v-model="oss.Hello.password"></a-input-password>
        </a-form-item>
      </a-form>
      <a-row type="flex" justify="center">
        <a-button @click="getToken">怎么获取这些消息</a-button>
      </a-row>
    </div>
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
      window.openUrl('https://www.helloimg.com/')
    }
  }
}
</script>

<style scoped>

</style>
