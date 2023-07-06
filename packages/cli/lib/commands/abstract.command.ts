import {Command} from "commander";
import { type AbstractAction } from "../actions/abstract.action";

export abstract class AbstractCommand {
    constructor(
        public action: AbstractAction
    ) {}

    public abstract load(program: Command): void;
}