<template>
  <div>
    <div style="min-height: 100%; position:relative;" >
      <div class="tips">
        <a-alert message="由于 hello 图床进行迁移, 需要根据新地址重新填写. 如果 储存策略ID 和 权限显示 空请手动选择一下🙇🏼"
                 type="success" />
      </div>
      <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="token" required>
          <a-input placeholder="请输入 token" v-model="oss.Hello.token"></a-input>
        </a-form-item>
        <a-form-item label="权限">
          <a-select v-model="oss.Hello.permission">
            <a-select-option value="1">公开</a-select-option>
            <a-select-option value="0">私有</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="储存策略ID">
          <a-select v-model="oss.Hello.strategyId">
            <a-select-option value="1">专业版</a-select-option>
            <a-select-option value="0">默认</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
      <a-row type="flex" justify="center">
        <a-button @click="getToken">怎么获取这些消息</a-button>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['oss'])
  },
  methods: {
    getToken () {
      window.openUrl('https://pro.helloimg.com/')
    }
  }
}
</script>

<style scoped>
.tips {
  position: absolute;
  width: 160px;
  right: 0;
}
</style>
