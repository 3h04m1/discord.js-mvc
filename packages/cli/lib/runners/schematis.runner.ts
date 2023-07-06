import chalk from "chalk";
import { AbstractRunner } from "./abstract.runner";
import { error } from "../utils/error";

export class SchematicsRunner extends AbstractRunner {
    constructor() {
        super('schematics')
    }

    static getSchematicsBinary() {
        try {
            require.resolve('@angular-devkit/schematics-cli/bin/schematics.js', {
                paths: module.paths
            })
        } catch (e) {
            error(`Schematics binary not found, please install it with ${chalk.bgBlueBright('npm i -g @angular-devkit/schematics-cli')}`)
        }
    }
}