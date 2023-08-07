import { Command } from 'commander'
import fs from 'node:fs'
import path from 'node:path'
import inquirer from 'inquirer'
import { NewAction } from '../actions'
import { AbstractCommand } from './abstract.command'
import { Input } from './command.input'
import { MESSAGES } from '../ui'
import { error } from '../utils'
import { runnerFactory } from '../runners/factory.runner'
import { managerFactory } from '../managers/manager.factory'
import ora from 'ora'

export interface NewCommandOptions {
  language: 'javascript' | 'typescript'
  packageManager: string
  git: boolean
  install: boolean
  directory: string
}

export class NewCommand extends AbstractCommand {
  constructor() {
    super(NewAction)
  }

  public load(program: Command) {
    program
      .command('new <name>')
      .alias('n')
      .description('Generate a new bot')
      .option(
        '-d, --directory <directory>',
        'Directory to create the bot in',
        '.'
      )
      .option('-l, --language <language>', 'Programming language')
      .option('-p, --package-manager <packageManager>', 'Package manager')
      .option('--no-git', 'Do not initialize a git repository', false)
      .option('--no-install', 'Do not install dependencies', false)
      .action(async (name: string, options: NewCommandOptions) => {
        options = await askNotProvided(options)

        if (options.directory !== '.') {
          const projectPath = path.join(options.directory, name)
          if (!fs.existsSync(options.directory)) {
            error(MESSAGES.INVALD_PATH(options.directory))
          }
          if (fs.existsSync(projectPath)) {
            error(MESSAGES.INVALD_PATH(projectPath, true))
          }

          process.chdir(options.directory)
        }

        const inputs: Input[] = []
        const parameters: Input[] = []
        const availableLanguages = ['javascript', 'typescript']
        const availablePackageManagers = ['npm', 'yarn', 'pnpm']

        parameters.push({ name: 'name', value: name })

        inputs.push({ name: 'language', value: options.language })
        inputs.push({ name: 'package-manager', value: options.packageManager })

        if (
          !!options.language &&
          !availableLanguages.includes(options.language)
        ) {
          error(
            MESSAGES.INVALID_INPUT(
              options.language,
              options.language,
              availableLanguages
            )
          )
        }

        if (
          !!options.packageManager &&
          !availablePackageManagers.includes(options.packageManager)
        ) {
          error(
            MESSAGES.INVALID_INPUT(
              options.packageManager,
              options.packageManager,
              availablePackageManagers
            )
          )
        }

        await new this.action(parameters, inputs).handle().then(() => {
          process.chdir(name)
        })

        if (!options.git) {
          await initRepository()
        }

        if (!options.install) {
          await installDependencies(options.packageManager)
        }
      })

    return program
  }
}

async function askNotProvided(options: NewCommandOptions) {
  const requiredOptions = ['language', 'packageManager']
  const notProvided = requiredOptions.filter(
    (option) => !options[option as keyof NewCommandOptions]
  )

  if (notProvided.length === 0) {
    return options
  }

  const res = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Select a programming language',
      choices: ['javascript', 'typescript'],
      when: !options.language,
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Select a package manager',
      choices: ['npm', 'yarn', 'pnpm'],
      when: !options.packageManager,
    },
  ])

  return {
    ...options,
    ...res,
  }
}

async function initRepository() {
  const spinner = ora('Initializing git repository').start()
  const git = runnerFactory('git')
  await git.run('init')
  await git.run('branch -m main')
  spinner.succeed("Initialized git repository")
}

async function installDependencies(packageManager: string) {
  const spinner = ora('Installing dependencies').start()
  const manager = managerFactory(packageManager)
  await manager.install()
  spinner.succeed("Installed dependencies")
}
