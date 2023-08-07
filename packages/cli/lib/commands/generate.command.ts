import { Command } from "commander";
import { GenerateAction } from "../actions/generate.action";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";
import { error } from "../utils";
import { SchematicNames } from "./types";
import chalk from "chalk";

export class GenerateCommand extends AbstractCommand {
    constructor() {
        super(GenerateAction);
    }
    
    public load(program: Command) {
        program
        .command("generate <schehmatic> <name>")
        .alias("g")
        .description("Generate a new controller, plugin, app or middleware")
        .option("-d, --directory <directory>", "Specify a particular directory to group the generated files")
        .option("-a, --app <app>", "Specify the app to generate the file in")
        .action(async (schematic: string , name: string, options: Record<string,string>) => {
            this.validateName(name);
            const inpts: Input[] = [];
            const opts: Input[] = [];
            inpts.push({ name: "schematic", value: getSchematicName(schematic) });
            inpts.push({ name: "name", value: name });
            opts.push({ name: "directory", value: options.directory });
            opts.push({ name: "app", value: options.app });
            await new this.action(inpts, opts).handle();
        })
        return program;
    }

    private validateName(name: string): void {
        const regex = /^[a-zA-Z]+$/;
        if (!regex.test(name)) {
            error(`
            Invalid name ${chalk.red(name)},
            if you want to generate a file inside a directory, use the 
            ${chalk.bgBlue(" --directory ")} flag
            `);
        }
    }
}

function getSchematicName(schematic: string): SchematicNames {
    const schematicNames: Record<SchematicNames, string[]> = {
        "controller": ["controller", "c"],
        "plugin": ["plugin", "p"],
        "app": ["app", "a"],
        "middleware": ["middleware", "m"],
    }
    for (const [key, value] of Object.entries(schematicNames)) {
        if (value.includes(schematic)) {
            return key as SchematicNames;
        }
    }
    error(`Invalid schematic name ${schematic}`);
    process.exit(1);
}