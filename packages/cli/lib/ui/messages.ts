import chalk from 'chalk'
import { ERROR_PREFIX, INFO_PREFIX } from './prefixes'

const errorIndent = ' '.repeat(7)
const infoIndent = ' '.repeat(6)

export function error(message: string) {
  return (
    ERROR_PREFIX +
    ' ' +
    message
      .split('\n')
      .map((line) => {
        return line.replace(/^\s*/, '')
      })
      .join('\n' + errorIndent)
      .trim()
  )
}

export function info(message: string) {
  return (
    INFO_PREFIX +
    ' ' +
    message
      .split('\n')
      .map((line) => line.replace(/^\s*/, ''))
      .join('\n' + infoIndent)
      .trim()
  )
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
  INVALD_PATH: (path: string, exists = false) =>
    `Invalid path: ${chalk.green(path)} ${
      exists ? 'already exists' : 'does not exist'
    }`,
  COMMAND_START: (command: string) =>
    info(`Starting command: ${chalk.green(command)}`),
  NEW_DONE: (name: string) => info(`BOT ${chalk.green(name)} created`),
  INFO: (message: string) => info(message),
}
