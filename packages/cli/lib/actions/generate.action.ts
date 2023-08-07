import { join } from 'node:path'
import { 
  existsOrMakeDir,
  getPackageJson,
  getToSrcPath,
 } from '../utils'
import { AbstractAction } from './abstract.action'
import { GenerateSchematic } from '../schematics/generate.schematic'
import { SchematicsRunner } from '../runners/schematis.runner'
import { SchematicNames } from '../commands/types'

export class GenerateAction extends AbstractAction {
  private dir: string = getToSrcPath()
  private typescript: boolean = !!getPackageJson()?.dependencies?.['typescript'] || !!getPackageJson()?.devDependencies?.['typescript']
  private schematic: GenerateSchematic = new GenerateSchematic(this.schematicOptions)
  private runner: SchematicsRunner = new SchematicsRunner()

  public async handle(): Promise<void> {
    process.chdir(this.workDir)
    await this.runner.run(this.schematic.command)
  }

  private get schematicName(): SchematicNames {
    const schematicInput = this.inputs.find(input => input.name === 'schematic')
    if (schematicInput) {
      return schematicInput.value as SchematicNames
    }
    throw new Error('Invalid schematic name')
  }

  private get workDir(): string {
    const app = this.options?.find(input => input.name === 'app')?.value as string | undefined
    const pth = app ? join(this.dir, 'apps', app) : this.dir
    let dirName = join(pth, this.schematicName + 's', this.parentDir || '')
    return existsOrMakeDir(dirName)
  }

  public get name(): string {
    const nameInput = this.inputs.find(input => input.name === 'name')
    if (nameInput) {
      return nameInput.value as string
    }
    throw new Error('Name not found')
  }

  public get parentDir(): string | undefined {
    const directoryInput = this.options?.find(input => input.name === 'directory')
    return directoryInput?.value as string | undefined
  }

  public get schematicOptions(): string[] {
    return [
      this.schematicName,
      this.name,
      this.typescript ? '--typescript' : '',
    ]
  }
}
