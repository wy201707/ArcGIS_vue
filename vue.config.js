const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devtool: 'source-map',
  configureWebpack: {
	  // devtool
	  devtool: 'source-map'
	},
  lintOnSave:false //关闭eslint检查
})
