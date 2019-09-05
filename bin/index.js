#!/usr/bin/env node

const program = require('commander')

program.version(require('../package.json').version).usage('<command> [options]')

program
  .command('start')
  .description('start a new project powered by koa-static-server')
  .option('-f, --folder <path>', 'Use target directory')
  .option('-c, --public [public]', 'Assets Prefix')
  .option('-p, --port [port]', 'Port Prefix')
  .action(function(options) {
    const config = {
      folder: options.folder || process.cwd(),
      public: options.public || '/static',
      port: options.port || '8419'
    }

    require('../lib')(config)
  })

program.on('--help', function() {
  console.log(``)
})

program.parse(process.argv)
