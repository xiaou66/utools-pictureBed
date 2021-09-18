<template>
  <div>
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="水印启用">
        <a-switch placeholder="region" v-model="configure.watermark.status"></a-switch>
      </a-form-item>
      <a-form-item label="水印位置">
        <a-select  v-model="configure.watermark.position">
          <a-select-option value="topLeft">左上</a-select-option>
          <a-select-option value="bottomLeft">左下</a-select-option>
          <a-select-option value="topRight">右上</a-select-option>
          <a-select-option value="bottomRight">右下</a-select-option>
          <a-select-option value="topCenter">上中</a-select-option>
          <a-select-option value="bottomCenter">下中</a-select-option>
          <a-select-option value="centerCenter">中间</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="水印图片">
        <div><a-button @click="setWatermarkImage">设置</a-button></div>
        <div>
          <img v-if="configure.watermark.image" :src="configure.watermark.image" style="max-width: 120px; height: auto" />
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['configure'])
  },
  methods: {
    setWatermarkImage () {
      const base64 = window.openWatermarkImage()
      if (!base64) {
        this.$message.warning('未选择文件')
        return
      }
      this.configure.watermark.image = base64
    }
  }
}
</script>

<style scoped>

</style>
