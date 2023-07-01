import { Middleware } from "discord.js-mvc";
import { BaseContext } from "discord.js-mvc/lib/base/Context";
import { Logger as WinstonLogger } from "winston";

export type LoggerFlavor<T extends BaseContext> = T & {
    logger: WinstonLogger
}

export interface Logger {
    middleware: Middleware,
    plugin: <T>(ctx: T) => void
}