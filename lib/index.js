const koa = require('koa')
const IP = require('ip')

const assetsMiddleware = require('./assetsMiddleware.js')
const host = IP.address()

module.exports = function(config) {
  const app = new koa()

  app.use(assetsMiddleware(config))

  app.listen(config.port, function() {
    console.log(`✨ Service runs on: http://${host}:${config.port}`)
  })
}
