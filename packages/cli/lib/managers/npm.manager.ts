import { AbstractManager } from "./abstract.manager";
import { runnerFactory, Runners } from "../runners/factory.runner";

export class NpmManager extends AbstractManager {
    constructor() {
        super(runnerFactory(Runners.NPM))
    }

    public get commads() {
        return {
            install: 'install',
            add: 'install',
            update: 'update',
            remove: 'uninstall',
            saveFlag: '--save',
            saveDevFlag: '--save-dev',
            silentFlag: '--silent',
        }
    }
}