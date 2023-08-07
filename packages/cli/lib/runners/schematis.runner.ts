import chalk from 'chalk'
import { AbstractRunner } from './abstract.runner'
import { error } from '../utils/error'

export class SchematicsRunner extends AbstractRunner {
  constructor() {
    super('node ' + SchematicsRunner.getSchematicsBinary())
  }

  public static getModulePaths() {
    return module.paths
  }

  public static find(pkg: string){
    return require.resolve(pkg, { paths: this.getModulePaths() })
  }

  public static getSchematicsBinary() {
    try {
      return (
        this.find('@angular-devkit/schematics-cli/bin/schematics.js') ||
        this.find('.bin/schematics.js') 
      )
    } catch (e) {
      console.error(e)
      error(
        `Schematics binary not found, please install it with ${chalk.bgBlueBright(
          ' npm i -g @angular-devkit/schematics-cli '
        )}`
      )
    }
  }

  public async run(
    command: string,
    collect: boolean = true,
    cwd?: string
  ): Promise<string | null> {
    return await super.run(command, collect, cwd)
  }
}
