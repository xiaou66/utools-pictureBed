#!/usr/bin/env node
const { Command } = require('commander')
const program = new Command();
const axios = require("axios");
const pkg = require('./package.json')

program.version(pkg.version)
    .description(pkg.description)
program.action(() => {
    console.log('default')
})
program.argument("<imagePath>", "图片地址")
    .option('-p --port <port>','端口需要和「utools」图床插件服务端口一致 默认:4126')
    .option('-bed --bedSource <bedSource>', '图床源,需要和「utools」图床插件名称一致')
    .action((imagePath, {bedSource = undefined, port}, command) => {
        const params = {
            path: imagePath,
        };
        if (bedSource) {
            params.bed = bedSource;
        }
        axios.get(encodeURI(`http://localhost:${port || 4126}`), {params})
            .then(res => {
                console.log(res.data)
            }).catch(e => {
            console.log('服务未启动')
        })
    })

program.parse()
