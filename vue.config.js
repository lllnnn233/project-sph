const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 打包时不要map文件
  productionSourceMap: false,
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
})
