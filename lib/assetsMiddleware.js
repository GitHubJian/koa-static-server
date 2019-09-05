const path = require('path')
const fse = require('fs-extra')
const koaSend = require('koa-send')

function middleware(config) {
  let maxage = 365 * 24 * 60 * 60 * 1000 // one year
  let prefix = config.prefix || '/'
  let staticFolderPath = config.staticFolderPath

  return async function(ctx, next) {
    let reqPath = ctx.path

    let realReqPath = reqPath.substring(prefix.length)
    let filePath = path.resolve(staticFolderPath, `.${realReqPath}`)
    let exists = await fse.pathExists(filePath)

    let result
    if (exists) {
      result = await koaSend(ctx, realReqPath, {
        root: staticFolderPath,
        maxage,
        setHeaders: function(res, path, stats) {
          res.setHeader('Author', 'Koa-Static-Server')
          res.setHeader('Cache-Control', `max-age=0,must-revalidate`)
        }
      })
    }

    if (!result) {
      ctx.status = 404
      ctx.body = `404 | Not Found | ${ctx.path}`
    }
  }
}

module.exports = middleware
