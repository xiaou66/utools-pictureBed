<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import { LinkWsClient } from '@xiaou66/interconnect-client'

export default {
  created () {
    window.plugConnect = () => {
      window.plugConnect = new LinkWsClient((e) => {
        console.log(e)
        window.plugConnect = null
      }, 'xiaou-pictureBed')
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
*::-webkit-scrollbar-track, *::-webkit-scrollbar-track-piece {
  border-radius: 0;
  background: #ffffff;
}
*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #c3c3c3;
  border: none;
}
*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
</style>
