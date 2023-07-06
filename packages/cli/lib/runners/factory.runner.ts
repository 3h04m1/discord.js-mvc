import { AbstractRunner } from "./abstract.runner";
import { NpmRunner } from "./npm.runner";
import { YarnRunner } from "./yarn.runner";
import { PnpmRunner } from "./pnpm.runner";

export enum Runners {
    NPM = 'npm',
    YARN = 'yarn',
    PNPM = 'pnpm',
}


export function runnerFactory(bin: Runners| string): AbstractRunner {
    switch (bin) {
        case 'npm':
            return new NpmRunner()
        case 'yarn':
            return new YarnRunner()
        case 'pnpm':
            throw new PnpmRunner()
        default:
            throw new Error(`Invalid runner ${bin}`)

    }
}