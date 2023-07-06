import chalk from 'chalk';
import { program } from 'commander';
import { CommandLoader } from './commands/loader.command';
import { getPackageJson } from './utils';
import { BANNER } from './ui';

async function bootstrap() {
    const pkg = getPackageJson();
    program.version(pkg.version, '-v, --version', 'output the current version');
    console.log(chalk.greenBright(BANNER));
    CommandLoader.load(program);
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
}

bootstrap();
