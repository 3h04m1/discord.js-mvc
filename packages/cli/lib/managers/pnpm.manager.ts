import { runnerFactory } from "../runners/factory.runner";
import { AbstractManager } from "./abstract.manager";

export class PnpmManager extends AbstractManager {
    constructor() {
        super(runnerFactory('pnpm'))
    }

    public get commads() {
        return {
            install: 'install',
            add: 'add',
            update: 'update',
            remove: 'remove',
            saveFlag: '--save',
            saveDevFlag: '--save-dev',
            silentFlag: '--silent',
        }
    }
}