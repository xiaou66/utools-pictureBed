<template>
  <div style="padding: 20px">
    <a-row   type="flex" justify="center">
      <div @click="openFiles" id="file-area" @dragenter.prevent @drop.prevent.stop="fileBoxDrag"  @dragover.prevent @dragleave.prevent>
        <a-icon type="cloud-upload" />
      </div>
    </a-row>
    <a-row type="flex" justify="space-between" style="margin-top: 30px">
      <a-col :span="17" >
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
      <a-col :span="7">
        <a-row type="flex" justify="start">
          <a-col :span="8"> <a-button @click="toNotesHandler()">笔记</a-button></a-col>
          <a-col :span="8"> <a-button @click="settingShow">设置</a-button></a-col>
          <a-col :span="8"><a-button @click="clearImage">清空</a-button></a-col>
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
            <span @click="toNotesHandler(item.image)">MD笔记</span>
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
import { uploadImage, usableSource } from '@/api/manager'
import uToolsUtils from '../js/uToolsUtils'
const defaultPictureBed = '猫盒'
export default {
  data () {
    return {
      fileModeKey: ['阿里云OSS', '腾讯云OSS', '千牛云', '又拍云',
        'GitHub', 'Gitee', 'onedrive', 'chevereto', 'Hello',
        '猫盒', 'imgUrlOrg', '牛图网', 'smMs',
        '映画/腾讯', '映画/京东', '映画/网易', '映画/头条', '映画/抖音',
        '映画/阿里', '映画/美团', '映画/百度', '映画/携程', '映画/搜狐', '映画/快手', '映画/苏宁']
    }
  },
  computed: {
    ...mapState(['image', 'configure'])
  },
  created () {
    // eslint-disable-next-line no-undef
    utools.onPluginReady(() => {
      // 版本检查
      uToolsUtils.isNewVersion()
      // 数据读入
      uToolsUtils.readAll()
      // webService 自启
      console.log(this.configure.webService.status)
      if (this.configure.webService.status) {
        const port = this.configure.webService.port
        window.startWebService(port).then(res => {
          window.utools.showNotification(`服务自启动完成\n端口「${port}」`)
        })
      }
      /**
       * 给命令上传使用返回url
       * @param path 文件路径
       * @param uploadImageMode 上传图床类型
       * @return {Promise<*>}
       */
      window.commandUploadImage = async (path, uploadImageMode = undefined) => {
        return await this.uploadFilePath(path, false, uploadImageMode)
      }
      console.log('fileModeKey', this.fileModeKey)
    })
    // eslint-disable-next-line no-undef
    utools.onPluginOut(() => {
      window.saveALL()
    })
    // eslint-disable-next-line no-undef
    utools.onPluginEnter(({ code, type, payload, optional }) => {
      this.$store.commit('clearInvalidImage')
      console.log(payload)
      if (type === 'files') {
        console.log(payload)
        if (payload.length === 1) {
          this.uploadFilePath(payload[0].path)
        } else {
          let i = 0
          payload.forEach(file => {
            setTimeout(() => {
              this.uploadFilePath(file.path)
            }, i++ * 500)
          })
        }
      } else if (type === 'img') {
        /data:image\/(.*?);/.test(payload)
        const item = window.dataURLtoFile(payload, `${Date.now()}.${RegExp.$1}`)
        this.uploadImageHandler(item)
      }
    })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 不显示未配置的图床
      vm.fileModeKey = vm.fileModeKey.filter(value => usableSource(value))
    })
  },
  methods: {
    // 去 Markdown 笔记插件
    toNotesHandler (url = '') {
      if (window.utools) {
        if (!url) {
          window.utools.redirect('Markdown 笔记')
        } else {
          const text = `![](${url})`
          this.copy(text)
          window.utools.redirect('Markdown 笔记')
        }
      }
    },
    /**
     * 上传图片处理
     * @param item file 对象
     * @param autoCopy 是否自动复制
     * @param selectFileMode 选择上传图床源
     * @param path
     * @return 上传成功需要返回 url
     */
    async uploadImageHandler (item, autoCopy = true, selectFileMode = this.image.selectFileMode, path = '') {
      if (!path) {
        path = item.path
      }
      this.fileModeKey.filter(value => usableSource(value))
      if (!this.fileModeKey.includes(selectFileMode)) {
        this.$message.warning('该源已经下线,请选择其他源')
        return
      }
      const id = Date.now()
      this.image.data.unshift({ id, image: '', loading: true })
      let result
      if (selectFileMode === '腾讯云OSS') {
        result = await uploadImage(item, id, selectFileMode, {
          callback: (result) => {
            if (result.status === 200) {
              const { url, id } = result
              this.$store.commit('setImage', { url, id })
              this.$message.success('上传成功')
              if (autoCopy) {
                this.autoCopy(url)
              }
              // 需要返回 url
              return url
            } else {
              this.$message.warning(result.message)
            }
          }
        })
      } else {
        result = await uploadImage(item, id, selectFileMode, { path })
        if (result.status === 200) {
          const { url, id } = result
          this.$store.commit('setImage', { url, id })
          this.$message.success('上传成功')
          if (autoCopy) {
            this.autoCopy(url)
          }
          // 需要返回 url
          return url
        } else {
          this.$message.warning(result.message)
        }
      }
    },
    // 自动复制
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
    // 选择模式判断
    selectModeChange (value) {
      console.log(value)
      if (!usableSource(value)) {
        this.$message.warning(`使用 「${value}」 在设置中需要配置`)
        this.image.selectFileMode = defaultPictureBed
      }
    },
    uploadFilePath (path, autoCopy = true, selectFileMode = this.selectFileMode) {
      // const prefixs = [{ key: 'chevereto', name: 'chevereto' }]
      // github 必须有时间戳
      const item = window.readFile(path, undefined)
      return this.uploadImageHandler(item, autoCopy, selectFileMode, path)
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
    // 清空
    clearImage () {
      this.$confirm({
        title: '二次确定',
        content: '确定要清空吗',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => {
          this.$store.commit('clearImage')
        }
      })
    },
    // 删除
    deleteItem (id) {
      this.$store.commit('deleteImageItem', id)
    },
    // 复制
    copy (text) {
      console.log(text)
      console.log(this)
      this.$copyText(text).then(() => {
        this.$message.success('复制成功')
      })
    },
    // html 复制
    htmlCopy (url) {
      const text = `<img src="${url}"  />`
      this.copy(text)
    },
    // MarkDown 复制
    mdCopy (url) {
      const text = `![](${url})`
      this.copy(text)
    },
    // 插件内文件拖动复制
    fileBoxDrag (e) {
      const files = [];
      [].forEach.call(e.dataTransfer.files, function (file) {
        files.push(file)
      }, false)
      console.log(files)
      // image/png
      // image/jpeg
      files.forEach(item => {
        const allowFormat = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
        if (allowFormat.includes(item.type) || allowFormat.toString().startsWith('image')) {
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
