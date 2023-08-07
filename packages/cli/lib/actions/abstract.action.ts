import { Input } from "../commands/command.input";

export type AbstractActionConstructor = new (
    inputs?: Input[],
    options?: Input[],
    extraFlags?: string[]
) => AbstractAction;

export abstract class AbstractAction {
    
    constructor(
        public inputs: Input[] = [],
        public options?: Input[],
        public extraFlags?: string[]
    ){}

    public abstract handle(...args: any[]): Promise<void>;
}