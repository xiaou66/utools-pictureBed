<template>
  <div style="min-height: 100%">
  <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="token" style="margin-top: 20px;">
      <a-tooltip placement="topLeft">
        <template #title>
            在「Dashboard > Settings > API」中
        </template>
        <a-input placeholder="请输入 API token" v-model="oss.chevereto.token"></a-input>
      </a-tooltip>
    </a-form-item>
    <a-form-item label="图床地址">
      <a-tooltip placement="topLeft">
        <template #title>
          结尾为 / 推荐游览器直接复制
        </template>
        <a-input placeholder="http://mysite.com/" v-model="oss.chevereto.url"></a-input>
      </a-tooltip>
    </a-form-item>
<!--    <a-form-item label="文件名前缀">-->
<!--      <a-tooltip placement="topLeft">-->
<!--        <template #title>-->
<!--          {Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {rand}:随机字符串 [可选]-->
<!--        </template>-->
<!--        <a-input placeholder="{Y}:年 {M}:月 {D}:日 {H}:时 {m}:分 {s}:秒 {rand}:随机字符串 [可选]" v-model="oss.chevereto.prefix">-->
<!--        </a-input>-->
<!--      </a-tooltip>-->
<!--    </a-form-item>-->
  </a-form>
  <a-row type="flex" justify="center">
  </a-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['oss'])
  }
}
</script>

<style scoped>

</style>
