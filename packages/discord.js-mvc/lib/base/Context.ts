import { BaseInteraction, Interaction } from 'discord.js'
import { hasCustomId } from '../types'
import { extractParams } from '../utils/extractParams'

/**
 * Represents a plugin function that modifies a context.
 * @template T - The type of the context to be modified.
 * @param ctx - The context to be modified.
 */
export type Plugin<T extends BaseContextCls = BaseContext> = (ctx: T) => void

/**
 * Base class for the context.
 */
abstract class BaseContextCls {
  abstract interaction: BaseInteraction
  /**
   * Parameters extracted from the route processing.
   */
  public params: Record<string, any> = {}

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
    if (hasCustomId(this.interaction)) {
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
  public declare message: never
  constructor(public interaction: T) {
    super()
  }
}

/**
 * Represents a plugin function specifically for interaction contexts.
 */
type InteractionPlugin = Plugin<InteractionContext>

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

function contextConstructor(
  interaction: BaseInteraction,
  plugins: Array<InteractionPlugin>,
  routePath?: string
): InteractionContext {
  let ctx: InteractionContext
  ctx = new InteractionContext(interaction)
  ctx.use(...(plugins as Array<InteractionPlugin>))
  ctx.setParams(routePath)
  return ctx
}

/**
 * Represents the base context type.
 * @template T - The base type of the context.
 */
export type BaseContext<T extends BaseInteraction = BaseInteraction> =
  InteractionContext<T>

export { contextConstructor }
