import { MiddlewareManager } from '../Middleware'
import { type Route } from './Route'
import { type Middleware } from '../Middleware/types'
import { type Interaction } from 'discord.js'
import { match } from 'path-to-regexp'
import { MaybeArray, hasCustomId } from '../types'
import {
  InteractionContext,
  contextConstructor,
  type Plugin,
} from '../base/Context'

/**
 * Router class responsible for handling and routing interactions.
 */
export class Router {
  readonly _routes: Route[] = []
  readonly _plugins: Plugin[] = []
  readonly _middlewareManager: MiddlewareManager = new MiddlewareManager()

  /**
   * Add middlewares to be applied to all routes in the router.
   * @param middlewares - The middlewares to be added.
   * @returns The router instance.
   */
  public use(...middlewares: Middleware[]): this {
    this._middlewareManager.add(...middlewares)
    return this
  }

  public plugin(...plugins: Plugin[]): this {
    this._plugins.push(...plugins)
    return this
  }

  /**
   * Add routes to the router.
   * @param routes - The routes to be added.
   * @returns The router instance.
   */
  public add(...routes: Array<MaybeArray<Route<any>>>): this {
    this._routes.push(...routes.flat())
    return this
  }

  public getRoute(path: string): Route | undefined {
    for (const route of this._routes) {
      const matchFN = match(route.name)
      if (!!matchFN(path)) {
        return route as Route
      }
    }
  }

  public getRoutePath(interaction: Interaction): string {
    if (hasCustomId(interaction)) {
      return interaction.customId
    } else if (interaction.isCommand()) {
      return interaction.commandName
    }
    throw new Error('Invalid interaction')
  }

  private async executeRoute(
    ctx: InteractionContext,
    route: Route<InteractionContext>
  ): Promise<void> {
    await this._middlewareManager.apply(ctx, route.run.bind(route))
  }

  /**
   * Handle an incoming interaction and execute the associated route.
   * @param interaction - The interaction to be handled.
   * @returns A promise that resolves when the handling is complete.
   */

  public async handle(interaction: Interaction): Promise<void> {
    const ctx = contextConstructor(interaction, this._plugins)
    const path = this.getRoutePath(interaction)
    const route = this.getRoute(path)
    if (route === undefined) {
      return
    }
    await this.executeRoute(ctx, route)
  }
}
