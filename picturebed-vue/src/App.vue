<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { LinkWsClient } from '@xiaou66/interconnect-client'
import { mapState } from 'vuex'
import uToolsUtils from '@/js/uToolsUtils'

export default {
  created () {
    window.plugConnecting = () => {
      window.plugConnect = new LinkWsClient((e) => {
        window.plugConnect = null
        this.$message.warn('插件互联服务启动失败, 请检查是否启动了插件互联服务')
      }, 'xiaou-pictureBed')
      window.plugConnect.addCallMessageListener('upload', async (data) => {
        let url = ''
        if (data.sourceName) {
          url = await window.commandUploadImage(data.filePath, data.sourceName)
        } else {
          url = await window.commandUploadImage(data.filePath)
        }
        return { url }
      })
    }
  },
  mounted () {
    // 数据读入
    uToolsUtils.readAll()
    if (this.configure.interconnect.status) {
      setTimeout(() => {
        window.plugConnecting()
      }, 500)
    }
  },
  computed: {
    ...mapState(['configure'])
  },
  methods: {
  }
}
</script>

<style lang="scss">
*::-webkit-scrollbar-track, *::-webkit-scrollbar-track-piece {
  border-radius: 0;
  background: #ffffff;
}
*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #c3c3c3;
  border: none;
}
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
</style>
