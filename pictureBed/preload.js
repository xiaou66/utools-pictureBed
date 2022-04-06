const fs = require('fs')
const mineType = require("mime-types")
const path = require('path');
const nodeFetch = require('node-fetch');
window.pluginInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'plugin.json')));
window.qiniu = require('qiniu');
window.nodeFetch = nodeFetch;
const mineMap = {
    "image/bmp": "bmp",
    "image/gif": "gif",
    "image/heic": "heic",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/svg+xml": "svg",
    "image/webp": "webp",
    "image/x-icon": "ico"
}
window.selectFile = () => {
    return utools.showOpenDialog({
        title: "请选择要上传的图片",
        defaultPath: utools.getPath("userData"),
        buttonLabel: "确定",
        properties: ["openFile"],
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
    });

};
window.saveJsonFile = (text, savePath, autoSave = false) => {
    if (autoSave) {
        fs.writeFileSync(savePath, text);
        return savePath;
    }
    const path = utools.showSaveDialog({
        title: '保存位置',
        filters: [{ name: "Json", extensions: ['json'] }],
        defaultPath: savePath || utools.getPath('downloads'),
        buttonLabel: '保存'
    });
    if (path) {
        fs.writeFileSync(path, text);
        return path;
    }
    return '';
}
window.readJsonFile = () => {
    const path = utools.showOpenDialog({
        filters: [{ name: "Json", extensions: ['json'] }],
        properties: ['openFile']
    })
    if (path && path.length) {
        const jsonString = fs.readFileSync(path[0]);
        return JSON.parse(jsonString);
    }
    return undefined;
}
window.readFile = (filePath, callback = undefined) => {
    console.log('filePath', filePath);
    const base64 = window.fileToBase64(filePath)
    const fileName = path.basename(filePath)
    console.log('fileName', fileName);
    let filename = fileName
    if (callback) {
        filename = callback(fileName)
    }
    console.log('fileName', filename);
    const file = dataURLtoFile(base64, filename)
    console.log('filename', file.name);
    return file
}
fileToBase64 = filePath => {
    let data = fs.readFileSync(filePath);
    data = new Buffer(data).toString("base64");
    console.log(data);
    let base64 = "data:" + mineType.lookup(filePath) + ";base64," + data;
    console.log(base64);
    return base64;
};
window.getMineTypeByPath = (filePath) => {
    try {
        return mineType.lookup(filePath);
    } catch (e) {
        return 'image/png'
    }
}
window.dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
};

window.openUrl = (url) => {
    utools.shellOpenExternal(url);
};
// service
window.webApp = undefined;
const Koa = require('koa');
const enableDestroy = require('server-destroy');
const net = require('net');
function paresPostData(ctx) {
    return new Promise((resolve, reject) => {
        try {
            let postData = ''
            ctx.req.addListener('data', (data) => {
                postData += data
            })
            ctx.req.on('end', () => {
                resolve(parseData(postData))
            })

        } catch (err) {
            reject(err)
        }
    })
}
function parseData(queryStr) {
    let queryData = {}
    let queryList = queryStr.split('&')
    for (let [index, queryItem] of queryList.entries()) {
        let itemList = queryItem.split('=')
        queryData[itemList[0]] = decodeURIComponent(itemList[1])
    }
    return queryData
}
window.saveTempFile = (base64_URL, path) => {
    const base64 = base64_URL.replace(/^data:image\/\w+;base64,/, "");
    fs.writeFileSync(path, base64, 'base64');
}
window.startWebService = async (port = 4126) => {
    try {
        await portUsed(port)
        if (window.webApp) {
            await window.stopWebService();
        }
        const app = new Koa();
        app.use(async (ctx) => {
            if (ctx.url === '/' && ctx.method === 'POST') {
                // post 处理
                let { base64 = '', path = '', bed = undefined, fileName = '', autoCopy = false } = await paresPostData(ctx);
                let [src, type, b] = base64.match(/^data:(image\/.+);base64,(.*)/)
                fileName = fileName ? fileName : Date.now() + '.' + mineMap[type];
                if (!base64 && !path) {
                    ctx.body = '? base64 || path'
                    return;
                }
                console.log(window.uploadImageByBase64);
                const url = base64 ? await window.uploadImageByBase64(base64, fileName, bed, autoCopy) : await window.commandUploadImage(path, bed);
                ctx.body = url || '';
                return;
            }
            const { path = '', bed = undefined } = ctx.query;
            if (!path) {
                ctx.body = 'path?'
                return;
            }
            console.log(path);
            const url = await window.commandUploadImage(path, bed);
            ctx.body = url || ''
        })
        window.webApp = app.listen(port, (e) => {
            console.log('e', e);
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}
window.stopWebService = async () => {
    enableDestroy(window.webApp);
    window.webApp.destroy();
    window.webApp = undefined;
}
window.openWatermarkImage = () => {
    const path = window.utools.showOpenDialog({
        filters: [{ name: 'png', extensions: ['png'] }],
        properties: ['openFile']
    })
    if (path && path.length) {
        return fileToBase64(path[0])
    }
    return ''
}
// 判断端口是否被占用
function portUsed(port) {
    return new Promise((resolve, reject) => {
        let server = net.createServer().listen(port);
        server.on('listening', function () {
            server.close();
            resolve(port);
        });
        server.on('error', function (err) {
            if (err.code == 'EADDRINUSE') {
                reject(err);
            }
        });
    });
}