const koa = require('koa')
const IP = require('ip')

const assetsMiddleware = require('./assetsMiddleware.js')
const host = IP.address()

const defaultConfig = {
  folder: process.cwd(),
  port: 8419
}

function start(config) {
  config = Object.assign({}, defaultConfig, config)

  const app = new koa()

  app.use(assetsMiddleware(config))

  app.listen(config.port, function() {
    console.log(`✨ Service runs on: http://${host}:${config.port}`)
  })
}

module.exports = {
  start
}
