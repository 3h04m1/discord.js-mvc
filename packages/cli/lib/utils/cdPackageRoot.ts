import { join } from 'node:path'
import { error } from './error'
import { dd } from './debug'
import chalk from 'chalk'
import { getPackageJson } from './package'

function isBotProject(pkg: Record<string, any>): boolean {
  return true
  return pkg.dependencies && pkg.dependencies['discord.js-mvc']
}

export function getToSrcPath(): string {
  const pkg = getPackageJson()
  if (!pkg) {
    error('This is not a node project, no package.json found')
    process.exit(1)
  }
  if (isBotProject(pkg))
    return join(pkg.__path.replace('package.json', ''), 'src')
  error(` This is not a discord.js-mvc project, discord.js-mvc is not found in your package.json
        Pleease run ${chalk.bgBlue(
          ' npm install discord.js-mvc '
        )} or ${chalk.bgBlue(' yarn add discord.js-mvc ')}
        to install discord.js-mvc
        `)
  process.exit(1)
}
