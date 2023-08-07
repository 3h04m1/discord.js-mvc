import { Command } from 'commander'
import { MESSAGES } from '../ui'
import { NewCommand } from './new.command'
import { GenerateCommand } from './generate.command'


export class CommandLoader {
  public static async load(program: Command): Promise<void> {
    new NewCommand().load(program)
    new GenerateCommand().load(program)
    CommandLoader.handleInvalidCommand(program)
    await program.parseAsync(process.argv)
  }

  private static handleInvalidCommand(program: Command) {
    program.on('command:*', () => {
      console.error(MESSAGES.INVALID_COMMAND(program.args.join(' ')))
      process.exit(1)
    })
    return program
  }
}
