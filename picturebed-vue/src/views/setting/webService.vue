<template>
  <div>
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="端口" >
        <a-tooltip placement="topLeft">
          <template #title>
            如果服务已经启动需要手动重启
          </template>
          <a-input-number v-model="configure.webService.port" :min="1000" :max="65535"/>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="服务状态">
        <a-tooltip placement="topLeft">
          <template #title>
            点击可切换服务状态
          </template>
          <span @click="switchService">
            <a-tag :color="serviceStatus ? 'green': 'red'">{{serviceStatus ? 'UP' : 'DOWN'}}</a-tag>
          </span>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="是否自启" >
        <a-tooltip>
          <template #title>
            在加载插件时启动服务
          </template>
          <a-switch v-model="configure.webService.status" @change="switchWebService"></a-switch>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="帮助" >
        <a-button @click="openUrl">帮助</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      serviceStatus: false
    }
  },
  computed: {
    ...mapState(['configure'])
  },
  created () {
    this.getServiceStatus()
  },
  methods: {
    getServiceStatus () {
      this.serviceStatus = window.webApp !== undefined
    },
    async switchService () {
      if (!this.serviceStatus) {
        await window.startWebService(this.configure.webService.port)
        this.$message.success('服务启动成功🎉')
      } else {
        await window.stopWebService()
        this.$message.success('服务停止成功')
      }
      this.getServiceStatus()
    },
    async switchWebService (checked) {
      if (checked && !this.serviceStatus) {
        await this.switchService()
      }
    },
    async openUrl () {
      window.utools.shellOpenExternal('https://www.yuque.com/sbxm2a/ogaua2/py29hq#DwHZ8')
    }
  }
}
</script>

<style scoped>

</style>
