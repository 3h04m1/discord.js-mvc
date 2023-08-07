import { AbstractRunner } from "./abstract.runner";
import { NpmRunner } from "./npm.runner";
import { YarnRunner } from "./yarn.runner";
import { PnpmRunner } from "./pnpm.runner";
import { GitRunner } from "./git.runner";

export enum Runners {
    NPM = 'npm',
    YARN = 'yarn',
    PNPM = 'pnpm',
    GIT = 'git'
}


export function runnerFactory(bin: Runners| string): AbstractRunner {
    switch (bin) {
        case 'npm':
            return new NpmRunner()
        case 'yarn':
            return new YarnRunner()
        case 'pnpm':
            return new PnpmRunner()
        case 'git':
            return new GitRunner()
        default:
            throw new Error(`Invalid runner ${bin}`)

    }
}