<template>
  <div>
    <a-row>
      <a-button @click="savePictureData">导出图片数据</a-button>
    </a-row>
    <a-row style="margin-top: 10px">
      <a-button @click="readPictureData">导入图片数据</a-button>
    </a-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
