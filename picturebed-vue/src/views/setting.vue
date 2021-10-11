<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="设置"
      @back="() => this.$router.replace({name: 'index'})"
    />
    <a-tabs v-model="currentTab" @change="tabsChange" :tab-bar-style="{padding: 0}"  style="padding: 10px 15px; box-sizing: border-box;">
      <a-tab-pane :tab="item.name" v-for="item in tabsData" :key="item.name">
        <div>
          <router-view style="max-height: calc(100vh - 146px);overflow-y: auto"></router-view>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabsData: [
        { name: '阿里OSS', router: { name: 'aliOss' } },
        { name: '腾讯OSS', router: { name: 'tencentOss' } },
        { name: '七牛云', router: { name: 'QiNiu' } },
        { name: '又拍云', router: { name: 'upyun' } },
        { name: 'GitHub', router: { name: 'GitHub' } },
        { name: 'Gitee', router: { name: 'Gitee' } },
        { name: 'onedrive', router: { name: 'onedrive' } },
        { name: 'chevereto', router: { name: 'chevereto' } },
        { name: 'sm.ms', router: { name: 'smMs' } },
        { name: 'hello', router: { name: 'hello' } },
        { name: '猫盒', router: { name: 'catbox' } },
        { name: '通用', router: { name: 'general' } },
        { name: '服务', router: { name: 'webService' } },
        { name: '数据', router: { name: 'imageData' } }
      ],
      currentTab: '阿里OSS'
    }
  },
  methods: {
    tabsChange (activeKey) {
      const item = this.tabsData.find(i => i.name === activeKey)
      this.$router.replace(item.router)
    }
  }
}
</script>
<style scoped>
</style>
