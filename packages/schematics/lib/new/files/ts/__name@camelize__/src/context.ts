import { Base } from "discord.js"
import { BaseContext } from "discord.js-mvc"


/**
 * The context type for the bot
 * You can extend this type to add your own properties to the context
 * @example
 * ```ts
 * export type Context<T extends Base> = BaseContext<T> & SessionFlavor & {
 *  // your additional properties here
 * }
 * ```
 * 
 */
export type Context<T extends Base> = BaseContext<T>