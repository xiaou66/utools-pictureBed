<template>
  <div style="padding: 20px">
    <a-row   type="flex" justify="center">
      <div @click="openFiles" id="file-area" @dragenter.prevent @drop.prevent.stop="fileBoxDrag"  @dragover.prevent @dragleave.prevent>
        <a-icon type="cloud-upload" />
      </div>
    </a-row>
    <a-row type="flex" justify="space-between" style="margin-top: 30px">
      <a-col :span="16" >
        <a-row>
          <a-col :span="8">
            <a-select v-model="image.selectFileMode" style="width: 100%" @change="selectModeChange">
              <a-select-option :value="item" v-for="(item,index) in fileModeKey" :key="index">
                {{item}}
              </a-select-option>
            </a-select>
          </a-col>
          <a-col :span="8">
            <div style="display: flex;align-items: center;margin-left: 10px;">
              <a-select v-model="configure.autoCopy.mode" style="width: 100%">
                <a-select-option value="url">
                  url
                </a-select-option>
                <a-select-option value="md">
                  md
                </a-select-option>
                <a-select-option value="html">
                  html
                </a-select-option>
              </a-select>
              <a-tooltip>
                <template #title>
                  自动复制开关
                </template>
                <a-switch v-model="configure.autoCopy.enabled" style="margin-left: 10px"/>
              </a-tooltip>
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="5">
        <a-row type="flex" justify="start">
          <a-col :span="12"> <a-button @click="settingShow">设置</a-button></a-col>
          <a-col :span="12"><a-button @click="clearImage">清空</a-button></a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row type="flex" justify="start" style="padding-top: 10px;">
      <a-col v-for="(item,index) in image.data" :key="index" style="padding: 15px" class="item">
        <a-spin tip="Loading..." :spinning="item.loading">
          <img style="border-radius: 10px"  :src="item.image"  width="200px">
          <div class="options" v-if="!item.loading">
            <span @click="copy(item.image)">URL</span>
            <span @click="htmlCopy(item.image)">HTML</span>
            <span @click="mdCopy(item.image)">MD</span>
            <span @click="deleteItem(item.id)">删除</span>
            <span>{{item.createTime}}</span>
          </div>
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { uploadImage } from '../api/manager'
import { dateFormat } from '../js/Date'
import uToolsUtils from '../js/uToolsUtils'
const defaultPictureBed = '猫盒'
export default {
  data () {
    return {
      fileModeKey: ['阿里云OSS', '腾讯云OSS',
        '猫盒', 'uploadCC', 'imgUrlOrg',
        '如优-Postimages', '如优-阿里图床', '如优-头条', '如优-网易', '如优-掘金', '如优-搜狗']
    }
  },
  computed: {
    ...mapState(['image', 'configure'])
  },
  created () {
    // eslint-disable-next-line no-undef
    utools.onPluginReady(() => {
      uToolsUtils.isNewVersion()
      uToolsUtils.readAll()
    })
    // eslint-disable-next-line no-undef
    utools.onPluginOut(() => {
      window.saveALL()
    })
    // eslint-disable-next-line no-undef
    utools.onPluginEnter(({ code, type, payload, optional }) => {
      console.log('用户进入插件', code, type, payload)
      this.$store.commit('clearInvalidImage')
      console.log(payload)
      if (type === 'files') {
        console.log(payload)
        payload.forEach(file => {
          this.uploadFilePath(file.path)
        })
      } else if (type === 'img') {
        /data:image\/(.*?);/.test(payload)
        const item = window.dataURLtoFile(payload, `${Date.now()}.${RegExp.$1}`)
        this.uploadImageHandler(item)
      }
    })
  },
  methods: {
    async uploadImageHandler (item) {
      if (!this.fileModeKey.includes(this.image.selectFileMode)) {
        this.$message.warning('该源已经下线,请选择其他源')
        return
      }
      const id = Date.now()
      this.image.data.unshift({ id, image: '', loading: true })
      const result = await uploadImage(item, id)
      if (result.status === 200) {
        const { url, id } = result
        this.$store.commit('setImage', { url, id })
        this.$message.success('上传成功')
        this.autoCopy(url)
      } else {
        this.$message.warning(result.message)
      }
    },
    autoCopy (url) {
      if (this.configure.autoCopy.enabled) {
        switch (this.configure.autoCopy.mode) {
          case 'url':
            this.copy(url)
            break
          case 'md':
            this.mdCopy(url)
            break
          case 'html':
            this.htmlCopy(url)
            break
        }
      }
    },
    settingShow () {
      this.$router.push({ name: 'aliOss' })
    },
    selectModeChange (value) {
      console.log(value)
      if (value === '阿里云OSS') {
        if (!this.$store.state.oss.aliOss.accessKeySecret) {
          this.$message.warning('使用阿里云OSS在设置中需要配置')
          this.image.selectFileMode = defaultPictureBed
        }
      } else if (value === '腾讯云OSS') {
        if (!this.$store.state.oss.tencentOss.secretKey) {
          this.$message.warning('使用腾讯云OSS在设置中需要配置')
          this.image.selectFileMode = defaultPictureBed
        }
      } else if (value.includes('如优')) {
        if (!this.$store.state.oss.rruu.token) {
          this.$message.warning('使用如优需要在设置中需要配置token')
          this.image.selectFileMode = defaultPictureBed
        }
      }
    },
    uploadFilePath (path) {
      const item = window.readFile(path)
      this.uploadImageHandler(item)
    },
    openFiles () {
      const paths = window.selectFile()
      if (paths instanceof Array) {
        paths.forEach(path => {
          this.uploadFilePath(path)
        })
      } else {
        this.uploadFilePath(paths)
      }
    },
    clearImage () {
      this.$store.commit('clearImage')
    },
    deleteItem (id) {
      console.log(dateFormat('YYYY-mm-dd', new Date()))
      this.$store.commit('deleteImageItem', id)
    },
    copy (text) {
      console.log(text)
      console.log(this)
      this.$copyText(text).then(() => {
        this.$message.success('复制成功')
      })
    },
    htmlCopy (url) {
      const text = `<img src="${url}"  />`
      this.copy(text)
    },
    mdCopy (url) {
      const text = `![](${url})`
      this.copy(text)
    },
    fileBoxDrag (e) {
      const files = [];
      [].forEach.call(e.dataTransfer.files, function (file) {
        files.push(file)
      }, false)
      console.log(files)
      // image/png
      // image/jpeg
      files.forEach(item => {
        const allowFormat = ['image/png', 'image/jpeg', 'image/gif']
        if (allowFormat.includes(item.type)) {
          console.log(item)
          this.uploadImageHandler(item)
        } else {
          this.$message.warning('不支持该格式')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #file-area {
    width: 100%;
    height: 120px;
    background: #FF707B;
    margin-top: 10px;
    border-radius: 12px;
    transition: all .5s linear;
    font-size: 48px;
    text-align: center;
    color: white;
    line-height: 120px;
    cursor: pointer;
  &:hover {
     box-shadow: 0 3px 12px #FFC6CB;
   }
  }
  .item {
    position: relative;
    width: 200px;
    min-height: 100px;
    margin: 0 10px;
    &:hover .options {
      display: block !important;
    }
    .options {
      display: none;
      position: absolute;
      top: 50%;
      /*left: 50%;*/
      transform: translate(0,-50%);
      width: 200px;
      background: rgba(0,0,0,.4);
      border-radius: 10px;
      text-align: center;
      color: white;
      font-size: 14px;
      cursor: pointer;
      overflow: hidden;
      span {
        display: inline-block;
        width: 100%;
        border-bottom: 1px dashed #ccc;
        &:last-child {
          border-bottom: none;
        }
        &:hover{
          background: rgba(0,0,0,.5);
        }
      }
    }
  }
</style>
