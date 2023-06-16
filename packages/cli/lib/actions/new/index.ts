import inquirer from "inquirer";
import validateNpm from 'validate-npm-package-name'
import { NewBotData, OrmListChoice } from "../../types.js";
import { initPackage } from "../../utils/packageFunctions.js";


const ormType: OrmListChoice[] = [
    {
        name: "TypeORM",
        value: "typeorm"
    },
    {
        name: "Sequelize",
        value: "sequelize"
    },
    {
        name: "Mongoose",
        value: "mongoose"
    },
    {
        name: "prisma",
        value: "prisma"
    }
]

export default async function newBot(name?:string, path?:string){
    console.log("Path", path)
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Is this the name of the bot?",
            default: name,
            validate: (value) => {
                const valid = validateNpm(value);
                if(valid.validForNewPackages){
                    return true;
                }else{
                    return valid.errors?.join("\n");
                }
            }

        },
        {
            message:"Select your package manager",
            type: "list",
            name: "packageManager",
            default: "npm",
            choices: [
                {
                    name: "npm",
                    value: "npm"
                },
                {
                    name: "yarn",
                    value: "yarn"
                },
                {
                    name: "pnpm",
                    value: "pnpm"
                }
            ]
        },
        {
            message: "Would you like to use TypeScript?",
            type: "confirm",
            name: "typescript",
            default: true
        },
        {
            message: "Should include an ORM?",
            type: "confirm",
            name: "orm",
            default: true
        },
        {
            message: "What ORM would you like to use?",
            type: "list",
            name: "ormType",
            choices: ormType,
            when: (answers) => answers.orm
        }
    ]).then(async (data:NewBotData) => {
        // if the user specified a path, use that, otherwise use the current directory
        const botPath = path || process.cwd();
        await initPackage(data.packageManager, data, botPath);
        console.log("Done!")
    });
}