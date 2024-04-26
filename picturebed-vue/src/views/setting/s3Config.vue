<template>
  <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="endpoint" >
      <a-input placeholder="请输入 endpoint"></a-input>
    </a-form-item>
    <a-form-item label="accessKeyId" >
      <a-input placeholder="请输入 accessKeyId" type="password"></a-input>
    </a-form-item>
    <a-form-item label="secretAccessKey" >
      <a-input placeholder="请输入 secretAccessKey" type="password"></a-input>
    </a-form-item>
    <a-form-item label="region" >
      <a-input placeholder="请输入 region"></a-input>
    </a-form-item>
    <a-form-item label="bucket" >
      <a-input placeholder="bucket"></a-input>
    </a-form-item>
    <a-form-item label="bucket" >
      <a-input placeholder="bucket"></a-input>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  computed: {
  },
  methods: {
  }
}
</script>
<style scoped>

</style>
