import { AbstractSchematic } from './abstract.schematic'

export class GenerateSchematic extends AbstractSchematic {
  constructor(options: string[]) {
    super('@discordjs-mvc/schematics', 'generate', options)
  }
}
