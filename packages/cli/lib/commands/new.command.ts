import { Command } from 'commander'
import { NewAction } from '../actions'
import { AbstractCommand } from './abstract.command'
import { Input } from './command.input'
import { MESSAGES } from '../ui'
import { error } from '../utils'

export interface NewCommandOptions {
  language: 'javascript' | 'typescript' | 'js' | 'ts'
  packageManager: string
}

export class NewCommand extends AbstractCommand {
  constructor() {
    super(new NewAction())
  }

  public load(program: Command) {
    program
      .command('new [name]')
      .alias('n')
      .description('Generate a new bot')
      .option('-l, --language <language>', 'Programming language')
      .option('-p, --package-manager <packageManager>', 'Package manager')
      .action(async (name: string, options: NewCommandOptions) => {
        const inputs: Input[] = []
        const availableLanguages = ['javascript', 'typescript', 'js', 'ts']
        const availablePackageManagers = ['npm', 'yarn', 'pnpm']

        inputs.push({
          name: 'language',
          value: options.language || 'javascript',
        })
        inputs.push({
          name: 'packageManager',
          value: options.packageManager || 'npm',
        })

        if (!!options.language){
          if (!availableLanguages.includes(options.language)) {
            error(MESSAGES.INVALID_INPUT(options.language, options.language, availableLanguages))
          }
        }

        if (!!options.packageManager){
          if (!availablePackageManagers.includes(options.packageManager)) {
            error(MESSAGES.INVALID_INPUT(options.packageManager, options.packageManager, availablePackageManagers))
          }
        }
        this.action.handle(inputs, [], [name])
      })
    return program
  }
}
