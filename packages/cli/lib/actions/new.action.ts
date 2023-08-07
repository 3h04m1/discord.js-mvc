import { Input } from '../commands/command.input'
import { inputsToArgs, inputsToOptions } from '../utils/inputsToArgs'
import { SchematicsRunner } from '../runners/schematis.runner'
import { AbstractSchematicAction } from './abstractSchematic.action'
import { schematicFactory } from '../schematics/schematic.factory'
import { error } from '../utils/error'
import ora from 'ora'

export type NewActionArgs = [SchematicsRunner, Input[], Input[] | undefined]

export class NewAction extends AbstractSchematicAction {
  private runner: SchematicsRunner = new SchematicsRunner()

  constructor(public inputs: Input[] = [], public options?: Input[]) {
    super(schematicFactory('new'), inputs, options)
  }

  public async handle(): Promise<void> {
    const spinner = ora('Generating project').start()
    const getOptions = (inputs: Input[]): string[] => {
      const options: string[] = []
      inputs.forEach((input) => {
        if (input.name === 'language' && input.value === 'typescript') {
          options.push(`--typescript`)
          return
        }
        options.push(`--${input.name}=${input.value}`)
      })
      return options
    }

    this.schematic.options = getOptions(this.options || [])
    this.schematic.parameters = inputsToArgs(this.inputs)
    try {
      await this.runner.run(this.schematic.command, false)
      spinner.succeed('Project generated successfully')
    } catch (err: any) {
      spinner.fail('Failed to generate project')
      error(err)
    }
  }
}
