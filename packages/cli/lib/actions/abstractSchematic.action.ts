import { Input } from "../commands/command.input";
import { AbstractSchematic } from "../schematics/abstract.schematic";
import { AbstractAction } from "./abstract.action";

export type SchematicArgs = [AbstractSchematic, Input[], Input[]| undefined];

export abstract class AbstractSchematicAction extends AbstractAction {
    constructor(
        public schematic: AbstractSchematic,
        public inputs: Input[],
        public options?: Input[],
        public extraFlags?: string[],
    ){
        super(inputs, options, extraFlags);
    }

    public abstract handle(): Promise<void>;
}