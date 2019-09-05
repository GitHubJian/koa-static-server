#!/usr/bin/env node

const program = require('commander')
const minimist = require('minimist')
const chalk = require('chalk')

program.version(require('../package.json').version).usage('<command> [options]')

program
  .command('start')
  .description('start a new project powered by koa-static-server')
  .option('-s, --static', 'Use target directory')
  .option('-p, --prefix', 'Assets Prefix')
  .action(function(name, cmd) {
    const options = cleanArgs(cmd)

    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(chalk.yellow('\n Info: You provided more than one argument.'))
    }

    require('../lib')(options)
  })

program.on('--help', function() {
  console.log(``)
})

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

function cleanArgs(cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
