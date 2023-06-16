import { Interaction } from 'discord.js'
import { Middleware } from 'discord.js-mvc'
import {createLogger, format, transports} from "winston"

export function loggerMiddleware(): Middleware<Interaction> {
    const logger = createLogger({
        transports: [
            new transports.Console({
                format: format.combine(
                    format.colorize(),
                    format.timestamp(),
                    format.align(),
                    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
                )
            })
        ]
    })
    return async (ctx, next) => {
        if (ctx.isCommand()) {
            logger.info(`${ctx.user.tag} (${ctx.user.id}) ran command ${ctx.commandName}`)
        }
        await next()
    }
}
