# utools图床插件的命令工具
## 安装
### npm
```
npm install -g utools-picturebed-command
```

### yarn

```
yarn global add utools-picturebed-command
```

## 命令
### 说明
```
格式: upload [options] <imagePath>

utools 图床命令工具

Arguments:
  imagePath                     图片地址

Options:
  -V, --version                 output the version number
  -p --port <port>             端口需要和「utools」图床插件服务端口一致 默认:4126
  -bed --bedSource <bedSource>  图床源,需要和「utools」图床插件名称一致
  -h, --help                    display help for command


### demo

```
uploadImage D:\桌面\demo.png
uploadImage D:\桌面\demo.png --bed 猫盒
uploadImage D:\桌面\demo.png --bed GitHub
uploadImage D:\桌面\demo.png --bed onedrive
```

### Typora配置

![](https://cdn.jsdelivr.net/gh/xiaou66/picture@master/image/1631764517792-1631764517776.png)

