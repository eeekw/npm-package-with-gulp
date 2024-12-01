const { Command } = require('commander')
const program = new Command()
const { execSync } = require('child_process')

program.option('--modules <value>')
program.parse()
const options = program.opts()
process.env.modules = options.modules

try {
  execSync('gulp')
} catch (error) {
  console.log(error)
}
