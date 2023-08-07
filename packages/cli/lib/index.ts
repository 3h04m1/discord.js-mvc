#!/usr/bin/env node

import chalk from 'chalk'
import { program } from 'commander'
import { CommandLoader } from './commands/loader.command'
import { BANNER } from './ui'
import { getVersion } from './utils'

async function bootstrap() {
  program.version(getVersion(), '-v, --version', 'output the current version')
  console.log(chalk.cyan(BANNER))
  CommandLoader.load(program)
  if (!process.argv.slice(2).length) {
    program.outputHelp()
  }
}

bootstrap()
