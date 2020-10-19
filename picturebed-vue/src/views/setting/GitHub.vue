<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="token" >
        <a-input placeholder="请输入 token" v-model="oss.GitHub.token"></a-input>
      </a-form-item>
      <a-form-item label="仓库名" >
        <a-input placeholder="例: xiaou/picture" v-model="oss.GitHub.project"></a-input>
      </a-form-item>
      <a-form-item label="path" >
        <a-tooltip>
          <template #title>
            目录需要存在
          </template>
          <a-input placeholder="例: /image 或 /img/images [可留空上传到根目录]" v-model="oss.GitHub.path"></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item  label="是否用@连接">
        <a-tooltip>
          <template #title>
            地址有需要 @ 的可以打开
          </template>
          <a-switch  v-model="oss.GitHub.at"></a-switch>
        </a-tooltip>
      </a-form-item>
    </a-form>
    <a-row type="flex" justify="center">
      <a-tooltip>
        <template #title>
          主要需要 repo权限 具体权限自行设置
        </template>
        <a-button @click="getToken">怎么获取token</a-button>
      </a-tooltip>
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
      window.openUrl('https://github.com/settings/tokens/new')
    }
  }
}
</script>

<style scoped>

</style>
