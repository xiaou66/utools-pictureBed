<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="设置"
      @back="() => this.$router.replace({name: 'index'})"
    />
    <a-tabs v-model="currentTab" @change="tabsChange"  style="padding: 10px 15px">
      <a-tab-pane :tab="item.name" v-for="item in tabsData" :key="item.name">
        <router-view style="max-height: 85vh"></router-view>
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
        { name: 'GitHub', router: { name: 'GitHub' } },
        { name: 'sm.ms', router: { name: 'smMs' } },
        { name: '如优', router: { name: 'rruu' } },
        { name: '支持', router: { name: 'contributions' } }
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
