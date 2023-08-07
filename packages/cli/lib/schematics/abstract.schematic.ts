export abstract class AbstractSchematic {
    constructor(
        private lib: string,
        private schematic: string,
        public parameters: string[] = [],
        public options: string[] = []
    ){}

    public get command(): string {
        const argvs = [...this.parameters, ...this.options]
        return `${this.lib}:${this.schematic} ${argvs.join(' ')}`;
    }
}