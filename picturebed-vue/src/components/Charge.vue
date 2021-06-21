<template>
  <transition name="slide-fade">
  <div id="charge-box-cover" v-show="value">
      <a-row id="charge-box" type="flex" justify="center">
        <a-col>
          <div id="charge-box-inner">
            <div style="text-align: center;cursor: pointer;" >备注：图床 + 用户名</div>
            <img class="tips" src="https://gitee.com/xiaou520/xiaou520/raw/master/images/zf-logo.png">
            <img id="qrcode" src="https://gitee.com/xiaou66/xiaou66/raw/master/animation/zf.png" alt="zf.png" width="100%" @click="showNotice"  @contextmenu="close" />
            <img class="tips" src="https://gitee.com/xiaou520/xiaou520/raw/master/images/zf-logo.png">
            <div style="text-align: center;cursor: pointer;">你的支持就是插件维护的动力</div>
          </div>
          <svg width="400" height="400" viewBox="0 0 300 248" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id='eye'>
              <rect y="41" width="300" height="190" rx="20" fill="#1D9AB6"/>
              <rect x="20" y="58" width="262" height="159" rx="16" fill="#FFF7F7"/>
              <rect x="58.4173" width="70.7241" height="19" rx="7" transform="rotate(36.9353 58.4173 0)" fill="#1D9AB6"/>
              <rect width="70.7241" height="19" rx="7" transform="matrix(-0.799314 0.600913 0.600913 0.799314 241.531 0)" fill="#1D9AB6"/>
              <rect x="85" y="219" width="25" height="29" rx="3" fill="#1D9AB6"/>
              <rect x="191" y="219" width="25" height="29" rx="3" fill="#1D9AB6"/>
            </g>
          </svg>
        </a-col>
      </a-row>
  </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      by: '支付宝',
      money: 1,
      remarks: '',
      notice: {
        show: false
      }
    }
  },
  model: {
    prop: 'value',
    event: 'valueChange'
  },
  props: {
    value: {
      default: false
    }
  },
  methods: {
    noticeHandle () {
      const formData = new FormData()
      if (!this.money) {
        this.$message.warning('金额输入有误')
        return
      }
      formData.append('name', '图床')
      formData.append('by', this.by)
      formData.append('money', this.money)
      formData.append('remarks', this.remarks)
      fetch(`${this.$url.notice}/donate`, {
        method: 'POST',
        body: formData
      }).then(res => res.json())
        .then(res => {
          if (res.code === 200) {
            this.$message.success('已经通知了喲')
            this.notice.show = false
            this.$notification.success({
              message: '提示',
              description: '可以添加QQ群：791863400,查看捐助的钱去哪里了'
            })
          }
        }).catch(() => {
          this.$message.success('通知服务器出现问题')
        })
    },
    showNotice () {
      this.$emit('valueChange', false)
      this.notice.show = true
    },
    close () {
      this.notice.show = false
      this.$emit('valueChange', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all .4s ease;
}
.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
#charge-box-cover {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  z-index: 99999;
}
#charge-box {
  position: relative;
  #charge-box-inner {
    top: 120px;
    left: 45px;
    position: absolute;
    #qrcode {
      width: 158px;
      height: 158px;
      cursor: pointer;
    }
    .tips {
      padding:20px;
      height: 128px;
    }
  }
}
</style>
