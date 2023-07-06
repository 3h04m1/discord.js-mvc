import chalk from 'chalk'
import { ERROR_PREFIX, INFO_PREFIX } from './prefixes'

export function error(message: string) {
  return `${ERROR_PREFIX} ${message}`
}

export function info(message: string) {
  return `${INFO_PREFIX} ${message}`
}

export const MESSAGES = {
  COMMAND_ERROR: (command: string) =>
    `while executing command: ${chalk.green(command)}`,
  INVALID_INPUT: (input: string, value: string, acceptable?: string[]) =>
    `Invalid input: ${chalk.green(input)} with value: ${chalk.green(
      value
    )} is not acceptable.` +
    (acceptable
      ? ` Acceptable values are: \n ${chalk.green(acceptable.join(',\n'))}`
      : ''),
  INVALID_COMMAND: (command: string) =>
    `Invalid command: ${chalk.red(command)}. See ${chalk.green(
      '--help'
    )} for a list of available commands.`,
}
