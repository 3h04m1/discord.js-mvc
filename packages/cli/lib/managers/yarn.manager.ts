import { AbstractManager } from "./abstract.manager";
import { runnerFactory, Runners } from "../runners/factory.runner";

export class YarnManager extends AbstractManager {
    constructor() {
        super(runnerFactory(Runners.YARN))
    }

    public get commads() {
        return {
            install: 'install',
            add: 'add',
            update: 'upgrade',
            remove: 'remove',
            saveFlag: '--save',
            saveDevFlag: '-D',
            silentFlag: '--silent',
        }
    }
}