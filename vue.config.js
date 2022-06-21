const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devtool: 'source-map',
  configureWebpack: {
	  // devtool
	  devtool: 'source-map'
	},
/*   devServer: {
    proxy: 'http://localhost:3001'
  }, */
  lintOnSave:false ,//关闭eslint检查,
  publicPath:'./'  //配置公共路径

})

