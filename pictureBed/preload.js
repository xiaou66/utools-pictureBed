const fs = require('fs')
const mineType = require("mime-types")
const path = require('path');
window.pluginInfo = JSON.parse(fs.readFileSync(path.join(__dirname, 'plugin.json')));
const fetch = require('node-fetch');
window.nodeFetch = fetch;

window.selectFile = () => {
    return utools.showOpenDialog({
        title: "请选择要上传的图片",
        defaultPath: utools.getPath("userData"),
        buttonLabel: "确定",
        properties: ["openFile"],
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
    });

};
window.saveJsonFile = (text) => {
    const path = utools.showSaveDialog({
        title: '保存位置',
        filters: [{ name: "Json", extensions: ['json'] }],
        defaultPath: utools.getPath('downloads'),
        buttonLabel: '保存'
    });
    if (path) {
        fs.writeFileSync(path, text)
    }
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
window.readFile = (filePath, time = false, callback = undefined) => {
    debugger
    const base64 = window.fileToBase64(filePath)
    const fileName = path.basename(filePath)
    let filename = ''
    if (callback) {
        filename = callback(fileName)
    }
    if (!filename && time) {
        filename = `${Date.now()}-${fileName}`
    }
    console.log('fileName', filename);
    const file = dataURLtoFile(base64, filename)
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
window.startWebService = async (port = 4126) => {
    if (window.webApp) {
        await window.stopWebService();
    }
    const app = new Koa();
    app.use(async (ctx) => {
        const { path = '', bed = undefined } = ctx.query;
        if (!path) {
            ctx.body = 'path?'
            return;
        }
        console.log(path);
        const url = await window.commandUploadImage(path, bed);
        ctx.body = url || ''
    })
    window.webApp = app.listen(port);
    return true;
}
window.stopWebService = async () => {
    enableDestroy(window.webApp);
    window.webApp.destroy();
    window.webApp = undefined;
}
