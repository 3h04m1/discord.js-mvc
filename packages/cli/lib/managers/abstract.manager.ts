import { AbstractRunner } from "../runners/abstract.runner";
import { ManagerCommands } from "./managerCommands";
import {PackageManagers} from "./managers"

export abstract class AbstractManager {
    constructor(
        protected runner: AbstractRunner,
    ){}

    public install(): Promise<null | string> {
        return this.runner.run(this.commads.install)
    }

    public add(packageName: string): Promise<null | string> {
        return this.runner.run(`${this.commads.add} ${packageName}`)
    }

    public update(packageName: string): Promise<null | string> {
        return this.runner.run(`${this.commads.update} ${packageName}`)
    }

    public remove(packageName: string): Promise<null | string> {
        return this.runner.run(`${this.commads.remove} ${packageName}`)
    }

    public save(packageName: string): Promise<null | string> {
        return this.runner.run(`${this.commads.add} ${packageName} ${this.commads.saveFlag}`)
    }

    public abstract get commads(): ManagerCommands
}