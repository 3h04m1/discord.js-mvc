import {Command} from "commander";
import { AbstractActionConstructor } from "../actions/abstract.action";

export abstract class AbstractCommand {
    constructor(
        public action: AbstractActionConstructor
    ) {}

    public abstract load(program: Command): void;
}