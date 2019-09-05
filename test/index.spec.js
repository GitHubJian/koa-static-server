const options = {}

const config = {
  folder: options.folder || process.cwd(),
  port: options.port || '8419'
}

require('../lib')(config)
