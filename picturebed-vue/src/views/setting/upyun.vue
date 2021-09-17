<template>
  <div>
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="服务名称" required>
        <a-input placeholder="服务名称" v-model="oss.upyun.bucketName"></a-input>
      </a-form-item>
      <a-form-item label="操作员" required>
        <a-input placeholder="请输入 操作员" v-model="oss.upyun.username"></a-input>
      </a-form-item>
      <a-form-item label="密码" required>
        <a-input placeholder="操作员密码" v-model="oss.upyun.password"></a-input>
      </a-form-item>
      <a-form-item label="域名" required>
        <a-tooltip placement="topLeft">
          <template #title>
            需要带「http」或「https」
          </template>
          <a-input placeholder="域名必选要设置" v-model="oss.upyun.host"></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="路径设置">
        <a-row type="flex">
          <a-col :span="19">
            <a-input placeholder="/{filename}{.suffix}" v-model="oss.upyun.path"></a-input>
          </a-col>
          <a-col :span="5">
            <a-button @click="openUrl('https://help.upyun.com/knowledge-base/form_api/#save-key')">帮助</a-button>
          </a-col>
        </a-row>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['oss'])
  },
  methods: {
    openUrl (url) {
      window.utools.shellOpenExternal(url)
    }
  }
}
</script>

<style scoped>

</style>
