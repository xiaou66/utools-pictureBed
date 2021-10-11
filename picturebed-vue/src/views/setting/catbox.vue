<template>
  <div>
    <a-form  :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="userhash" >
        <a-input placeholder="userhash" v-model="oss.catbox.userhash"></a-input>
      </a-form-item>
    </a-form>
    <a-row type="flex" justify="center">
      <a-button @click="getToken">怎么获取token</a-button>
    </a-row>
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
      window.openUrl('https://catbox.moe/user/manage.php')
    }
  }
}
</script>

<style scoped>

</style>
