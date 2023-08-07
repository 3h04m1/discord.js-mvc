import chalk from 'chalk'

export const namedLink = (name: string, url: string) =>
  chalk.blue.underline.italic(`${name} (\u200B${url}\u200B)`)
