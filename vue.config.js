const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // 反向代理
    proxy : {
      "/webapi" :{
        target : "http://localhost:3000",
        changeOrigin : true,
      },
      "/adminapi" :{
        target : "http://localhost:3000",
        changeOrigin : true,
      },
    },
    host: '0.0.0.0',
    port:8000,
    client: {
      webSocketURL: 'ws://0.0.0.0:8000/ws',
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
})
