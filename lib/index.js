const koa = require('koa')

const assetsMiddleware = require('./assetsMiddleware.js')

module.exports = function(config) {
  const app = new koa()

  app.use(assetsMiddleware(config.assets))

  app.listen(config.port, function() {
    console.log(`✨ 服务已启动 `)
  })
}
