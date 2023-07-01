import { Message, BaseInteraction, Interaction, Base } from 'discord.js'
import { hasCustomId } from '../types'
import { extractParams } from '../utils/extractParams'

export function isMsg(
  data: Message | BaseInteraction
): data is Message {
  return 'content' in data
}

export function isInteraction(
  data: Message | BaseInteraction
): data is BaseInteraction {
  return data instanceof BaseInteraction
}

/**
 * Represents a plugin function that modifies a context.
 * @template T - The type of the context to be modified.
 * @param ctx - The context to be modified.
 */
export type Plugin<T extends BaseContextCls = BaseContext> = (ctx: T) => void

/**
 * Base class for the context.
 */
class BaseContextCls {
  public interaction?: BaseInteraction
  public message?: Message
  /**
   * Parameters extracted from the route processing.
   */
  public params: Record<string, any> = {}

  /**
   * Checks if the current context is an interaction context.
   * @returns True if the context is an interaction context, false otherwise.
   */
  public isInteraction(): this is InteractionContext {
    return this.interaction !== undefined
  }

  /**
   * Checks if the current context is a message context.
   * @returns True if the context is a message context, false otherwise.
   */
  public isMessage(): this is MessageContext {
    return this.message !== undefined
  }

  /**
   * Applies the specified plugins to the context.
   * @param plugins - The plugins to be applied.
   * @returns The modified context.
   */
  public use(...plugins: Plugin<this>[]): this {
    plugins.forEach((plugin) => plugin(this))
    return this
  }

  /**
   * Sets the parameters based on the route path.
   * @param routePath - The route path used to extract parameters.
   */
  public setParams(routePath?: string): void {
    if (this.isInteraction() && hasCustomId(this.interaction)) {
      this.params = routePath
        ? extractParams(this.interaction.customId, routePath)
        : {}
      return
    }
    this.params = {}
  }
}

/**
 * Represents an interaction context.
 * @template T - The type of interaction contained in the context.
 */
export class InteractionContext<
  T extends BaseInteraction = BaseInteraction
> extends BaseContextCls {
  /**
   * The interaction object.
   */
  declare public message: never;
  constructor(public interaction: T) {
    super()
  }
}

/**
 * Represents a message context.
 */
export class MessageContext extends BaseContextCls {
  /**
   * The message object.
   */
  declare public interaction: never;
  constructor(public message: Message) {
    super()
  }
}

/**
 * Represents a plugin function specifically for interaction contexts.
 */
type InteractionPlugin = Plugin<InteractionContext>

/**
 * Represents a plugin function specifically for message contexts.
 */
type MessagePlugin = Plugin<MessageContext>

/**
 * Constructs the appropriate context based on the provided parameters.
 * @param interaction - The interaction object.
 * @param plugins - The plugins to be applied to the context.
 * @param routePath - The route path used for parameter extraction.
 * @returns An instance of InteractionContext or MessageContext.
 */
function contextConstructor(
  interaction: Interaction,
  plugins: Array<InteractionPlugin>,
  routePath?: string
): InteractionContext

/**
 * Constructs a message context.
 * @param message - The message object.
 * @param plugins - The plugins to be applied to the context.
 * @returns An instance of MessageContext.
 */
function contextConstructor(
  message: Message,
  plugins: Array<MessagePlugin>
): MessageContext

function contextConstructor(
  interaction: BaseInteraction | Message,
  plugins: Array<InteractionPlugin> | Array<MessagePlugin>,
  routePath?: string
): InteractionContext | MessageContext {
  let ctx: InteractionContext | MessageContext
  if (isMsg(interaction)) {
    ctx = new MessageContext(interaction)
    ctx.use(...(plugins as Array<MessagePlugin>))
    return ctx
  }
  if (isInteraction(interaction)) {
    ctx = new InteractionContext(interaction)
    ctx.use(...(plugins as Array<InteractionPlugin>))
    ctx.setParams(routePath)
    return ctx
  }
  throw new Error('Invalid context')
}

/**
 * Represents the base context type.
 * @template T - The base type of the context.
 */
export type BaseContext<T extends Base = any> = T extends BaseInteraction
  ? InteractionContext<T>
  : MessageContext

export { contextConstructor }
