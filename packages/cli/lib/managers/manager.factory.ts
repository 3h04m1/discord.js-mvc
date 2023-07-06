import { NpmManager } from './npm.manager'
import { YarnManager } from './yarn.manager'
import { PnpmManager } from './pnpm.manager'
import { PackageManagers } from './managers'
import { error } from '../utils/error'
import { MESSAGES } from '../ui'

export const managerFactory = (manager: PackageManagers | string) => {
  switch (manager) {
    case PackageManagers.NPM:
      return new NpmManager()
    case PackageManagers.YARN:
      return new YarnManager()
    case PackageManagers.PNPM:
      throw new PnpmManager()
    default:
      error(
        MESSAGES.INVALID_INPUT(
          'packageManager',
          manager,
          Object.values(PackageManagers)
        )
      )
  }
}
