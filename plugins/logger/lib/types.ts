import { Middleware } from "discord.js-mvc";
import { Logger as WinstonLogger } from "winston";

export type LoggerFlavor = {
    logger: WinstonLogger
}

export interface Logger {
    middleware: Middleware,
    plugin: <T>(ctx: T) => void
}