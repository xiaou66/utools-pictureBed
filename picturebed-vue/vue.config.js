// eslint-disable-next-line no-undef
// const TerserPlugin = require('terser-webpack-plugin')
// eslint-disable-next-line no-undef
module.exports = {
  publicPath: './',
  outputDir: '../pictureBed/vue',
  productionSourceMap: true,
  devServer: {
    proxy: {
      '/imgkr': {
        target: 'https://imgkr.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/imgkr': ''
        }
      },
      '/ac': {
        target: 'https://images.ac.cn',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/ac': ''
        }
      }
    }
  },
  configureWebpack: {
    // optimization: {
    //   minimizer: [
    //     new TerserPlugin({
    //       terserOptions: {
    //         ecma: undefined,
    //         warnings: false,
    //         parse: {},
    //         compress: {
    //           drop_console: true,
    //           drop_debugger: false,
    //           pure_funcs: ['console.log'] // 移除console
    //         }
    //       }
    //     })
    //   ]
    // }
  }

}
