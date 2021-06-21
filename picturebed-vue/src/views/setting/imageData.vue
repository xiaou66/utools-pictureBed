<template>
  <div>
    <a-row>
      <a-button @click="savePictureData">导出图片数据</a-button>
    </a-row>
    <a-row style="margin-top: 10px">
      <a-button @click="readPictureData">导入图片数据</a-button>
    </a-row>
    <a-row style="margin-top: 10px">
      <a-button @click="clearDataModal.visible = true">清理配置数据</a-button>
    </a-row>
    <a-modal v-model="clearDataModal.visible" ok-text="清理" cancelText="放弃"
             @cancel="clearDataCancel" @ok="clearConfigData">
      <div style="margin: 20px;">
        <div style="margin-bottom: 4px;">请选择要清理的数据项</div>
        <div>
          <a-select
            mode="tags"
            placeholder="请选择要清理的数据项"
            v-model="clearDataModal.clearDataKey"
            style="width: 100%"
          >
            <a-select-option v-for="item in clearDataModal.list" :key="item.key">
              {{item.name}}
            </a-select-option>
          </a-select>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import uToolsUtils from '@/js/uToolsUtils'
export default {
  data () {
    return {
      clearDataModal: {
        visible: false,
        clearDataKey: [],
        list: [
          { name: '阿里云', key: 'aliOss' },
          { name: '腾讯云', key: 'tencentOss' },
          { name: 'sm.ms', key: 'smMs' },
          { name: 'GitHub', key: 'GitHub' }
        ]
      }
    }
  },
  computed: {
    ...mapState(['image'])
  },
  methods: {
    savePictureData () {
      window.saveJsonFile(JSON.stringify(this.image.data))
    },
    readPictureData () {
      const data = window.readJsonFile()
      if (data) {
        this.image.data.push(...data)
      }
    },
    clearDataCancel () {
      this.clearDataModal.clearDataKey = []
      this.clearDataModal.visible = false
    },
    clearConfigData () {
      if (!this.clearDataModal.clearDataKey.length) {
        this.$message.warning('未选择清理数据项')
        return
      }
      this.$store.commit('clearOssData', this.clearDataModal.clearDataKey)
      uToolsUtils.save('oss')
      this.clearDataCancel()
      this.$message.success('配置数据已经恢复')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
