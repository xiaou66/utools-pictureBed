<template>
  <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="状态" >
      <a-switch></a-switch>
    </a-form-item>
    <a-form-item label="启动自起" >
      <a-switch></a-switch>
    </a-form-item>
  </a-form>
</template>
<script>

export default {
  computed: {
  },
  methods: {
    serviceConnect () {
      console.log('')
    }
  }
}
</script>
<style scoped>

</style>
