import winston from 'winston'
import { Logger } from './types'
import chalk from 'chalk'
import { hasCustomId } from 'discord.js-mvc'

export function loggerConstructor(options: winston.LoggerOptions = {}): Logger {
  const logger = winston.createLogger(options)

  return {
    middleware: async (ctx, next) => {
        const startTime = Date.now()
        await next()
        const endTime = Date.now()
        const time = endTime - startTime
        let messageLog: string|undefined = undefined
        if (ctx.isInteraction()) {
            const interaction = ctx.interaction
            if (interaction.isCommand()) {
                messageLog = `${chalk.bgCyan(interaction.type)} ${chalk.blueBright(interaction.commandName)} (${interaction.user.username}) ${chalk.greenBright(time)}ms`
            } else if (hasCustomId(interaction)) {
                messageLog = `${chalk.bgCyan(interaction.type)} ${chalk.blueBright(interaction.customId)} (${interaction.user.username}) ${chalk.greenBright(time)}ms`
            } else {
                messageLog = `${chalk.bgCyan(interaction.type)} (${interaction.user.username}) ${chalk.greenBright(time)}ms`
            }
        } else if (ctx.isMessage()){
            const message = ctx.message
            messageLog = `${chalk.bgCyan('message')} ${chalk.blueBright(message.content)} (${message.author.username}) ${chalk.greenBright(time)}ms`
        }
        if (messageLog) {
            logger.info(messageLog)
        }
    },
    plugin: (ctx) => {
        (ctx as any).logger = logger
    },
    logger: logger
  }
}
