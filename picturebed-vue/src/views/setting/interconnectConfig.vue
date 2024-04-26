<template>
  <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="状态" >
      <a-switch @change="plugConnectStatusChange" v-model="plugConnectStatus" />
    </a-form-item>
    <a-form-item label="启动自起" >
      <a-switch v-model="configure.interconnect.status"></a-switch>
    </a-form-item>
  </a-form>
</template>
<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      plugConnectStatus: false,
      timer: null
    }
  },
  mounted () {
    this.plugConnectStatus = !!window.plugConnect
    this.timer = setInterval(() => {
      this.plugConnectStatus = !!window.plugConnect
    }, 1000)
  },
  beforeDestroy () {
    console.log('beforeDestroy')
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  computed: {
    ...mapState(['configure'])
  },
  methods: {
    plugConnectStatusChange (val) {
      if (val) {
        if (!window.plugConnect) {
          window.plugConnecting()
        }
      } else {
        if (window.plugConnect) {
          window.plugConnect.close()
          window.plugConnect = null
          this.plugConnectStatus = false
        }
      }
    },
    serviceConnect () {
      console.log('')
    }
  }
}
</script>
<style scoped>

</style>
