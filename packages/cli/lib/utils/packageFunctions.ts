import {PackageManager, PackageManagerFunctions,NewBotData, hasOrm} from "../types.js"
import chalk from "chalk"
import * as constants from './constants.js'
import fs from "node:fs"
import path from "node:path"
// import node subprocesses
import {spawn} from "node:child_process"

function getFullPath(cwd:string){
    return path.resolve(cwd)
}


export function getPackageManagerFunctions(packageManager:PackageManager): PackageManagerFunctions {
    switch (packageManager) {
        case "yarn":
            return {
                init: ["init", "-y"],
                install: ["add"],
                installDev: ["add", "-D"]
            }
        case "npm":
            return {
                init: ["init", "-y"],
                install: ["install"],
                installDev: ["install", "-D"]
            }
        case "pnpm":
            return {
                init: ["init", "-y"],
                install: ["add"],
                installDev: ["add", "-D"]
            }
        default:
            throw new Error("Invalid package manager")
    }
}

function exec(command:string,args:string[], cwd:string = "."){

    return new Promise((resolve,reject) => {
        // if cwd is not the current directory, add the cwd flag
        // if the directory does not exist, create it
        if (cwd !== ".") {
            if (!fs.existsSync(cwd)) {
                fs.mkdirSync(cwd)
            }
        }
        if (command.startsWith("yarn")) {
            args.push("--cwd", cwd)
        }
        const child = spawn(command, args, {
            stdio: "inherit"
        })
        child.on("close", (code) => {
            if (code !== 0) {
                reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code}`))
                return
            }
            resolve(true)
        })
    })
}


export async function initPackage(packageManager:PackageManager,data:NewBotData, cwd:string = ".") {
    const projectPath = getFullPath(cwd)
    const {init} = getPackageManagerFunctions(packageManager)
    await exec(data.packageManager, init, cwd)
    // edit package.json
    const packageJson = fs.existsSync(`${cwd}/package.json`) ? JSON.parse(fs.readFileSync(`${cwd}/package.json`, "utf-8")) : {}
    packageJson.name = data.name
    packageJson.version = "0.0.1"
    packageJson.description = "A Discord bot created with discord.js-mvc"
    packageJson.license = "MIT"
    if(data.typescript){
        packageJson.main = "dist/index.js"
        packageJson.types = "dist/index.d.ts"
        packageJson.scripts = {
            "build": "tsc",
            "start": "node dist/index.js"
        }
    }else{
        packageJson.main = "src/index.js"
        packageJson.scripts = {
            "start": "node src/index.js"
        }
    }
    // write package.json
    console.log(chalk.green("Writing package.json..."))
    fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(packageJson, null, 2))
    // install dependencies
    console.log(chalk.green("Installing dependencies..."))
    installDependencies(packageManager, constants.DEPENDENCIES, false, cwd)
    console.log(chalk.green("Installing dev dependencies..."))
    installDependencies(packageManager, constants.DEV_DEPENDENCIES, true, cwd)
    if(hasOrm(data)){
        console.log(chalk.green("Installing orm..."))
        installDependencies(packageManager, constants.DB_DEPENDENCIES[data.ormType], false, cwd)
    }
}

export async function installDependencies(packageManager:PackageManager, dependencies:string[], dev:boolean = false, cwd:string = ".") {
    const {install, installDev} = getPackageManagerFunctions(packageManager)
    const command = dev ? installDev : install
    return await exec(packageManager, [...command, ...dependencies], cwd)
}