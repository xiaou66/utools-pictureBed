<template>
  <div>
    <a-row>
      <div style="display: flex; align-items: center">
        <a-button @click="savePictureData">导出图片数据</a-button>
        <div v-if="configure.dataSavePath" style="padding-left: 10px;">上一次导出位置「{{configure.dataSavePath}}」</div>
      </div>
    </a-row>
    <a-row style="margin-top: 10px;display: flex; align-items: center;" v-if="configure.dataSavePath">
      <div style="padding-left: 54px;">自动保存</div>
      <div style="padding-left: 10px;">
        <a-switch checked-children="开" un-checked-children="关"
                  v-model="configure.autoSave.enable" @change="autoSaveChange"/>
      </div>
      <div style="padding-left: 12px;">
        <a-tooltip placement="topLeft">
          <template #title>间隔时间, 按下回车生效</template>
          <a-input-number v-model="configure.autoSave.interval" :min="2" :max="120" @pressEnter="autoSaveChange"/>
        </a-tooltip>
        <span style="padding-left: 4px;">分钟</span>
      </div>
      <div style="padding-left: 10px;">{{configure.autoSave.prevSaveTime || '无保存记录'}}</div>
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
    ...mapState(['image', 'configure'])
  },
  methods: {
    autoSaveChange () {
      window.startAutoSaveData()
    },
    savePictureData () {
      const { dataSavePath = undefined } = this.configure
      const path = window.saveJsonFile(JSON.stringify(this.image.data), dataSavePath)
      if (path) {
        this.configure.dataSavePath = path
      }
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
