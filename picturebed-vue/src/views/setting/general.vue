<template>
  <div>
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-divider orientation="left" style="margin: 0;">
        水印设置
      </a-divider>
      <a-form-item label="水印启用">
        <a-tooltip placement="topLeft">
          <template #title>
            除「七牛云」其他都支持
          </template>
          <a-switch placeholder="region" v-model="configure.watermark.status"></a-switch>
        </a-tooltip>
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
      <a-divider orientation="left" style="margin: 0;">
        自定义复制格式
      </a-divider>
      <a-form-item label="自定义复制格式" style="margin: 5px;">
        <a-tooltip placement="topLeft">
          <template #title>输入为空则不使用,{url}代表图片上传后的链接</template>
          <a-input v-model="configure.customUrl.value1"></a-input>
        </a-tooltip>
      </a-form-item>
      <a-form-item label="替换项">
        <a-select v-model="configure.customUrl.hide1">
          <a-select-option value="URl">URl</a-select-option>
          <a-select-option value="HTML">HTML</a-select-option>
          <a-select-option value="MD">MD</a-select-option>
          <a-select-option value="MD笔记">MD笔记</a-select-option>
        </a-select>
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
