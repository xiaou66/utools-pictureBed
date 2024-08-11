<template>
  <div style="min-height: 100%">
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="clientID" >
        <a-input placeholder="clientID" v-model="oss.pan123.clientID"></a-input>
      </a-form-item>
      <a-form-item label="clientSecret">
        <a-input placeholder="clientSecret" v-model="oss.pan123.clientSecret"></a-input>
      </a-form-item>
      <a-form-item label="目录" >
        <a-select placeholder="默认根目录"
                  show-search
                  :options="dirOptions"
                  @dropdownVisibleChange="handleDropdownVisibleChange"
                  v-model="oss.pan123.parentFileID" />
      </a-form-item>
    </a-form>
    <a-row type="flex" justify="center">
    </a-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getDirList } from '@/api/123Pan'
export default {
  data () {
    return {
      dirOptions: []
    }
  },
  computed: {
    ...mapState(['oss'])
  },
  methods: {
    handleDropdownVisibleChange () {
      if (!this.oss.pan123.clientID || !this.oss.pan123.clientSecret) {
        return
      }
      getDirList().then(res => {
        this.dirOptions = res.fileList.filter(item => item.type === 1).map(item => {
          return {
            value: item.fileID,
            label: item.filename
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
