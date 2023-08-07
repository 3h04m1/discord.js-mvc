import { AbstractSchematic } from "./abstract.schematic";

export class NewSchematic extends AbstractSchematic {
    constructor(options?: string[]) {
        super('@discordjs-mvc/schematics', 'new', options);
    }
}