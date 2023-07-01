import { MiddlewareManager } from '../Middleware'
import { type Route } from './Route'
import { type Middleware } from '../Middleware/types'
import { type Interaction, Message } from 'discord.js'
import { match } from 'path-to-regexp'
import { MaybeArray, hasCustomId } from '../types'
import {
  InteractionContext,
  MessageContext,
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

  public get messageRoutes(): Route<MessageContext>[] {
    // return all routes that have a regexp type for their name
    return this._routes.filter(
      (route) => route.name instanceof RegExp
    ) as Route<MessageContext>[]
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

  public getRoute(path: string): Route<InteractionContext> | undefined {
    for (const route of this._routes) {
      const matchFN = match(route.name)
      if (matchFN(path) !== false) {
        return route as Route<InteractionContext>
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
    ctx: MessageContext,
    route: Route<MessageContext>
  ): Promise<void>
  private async executeRoute(
    ctx: InteractionContext,
    route: Route<InteractionContext>
  ): Promise<void>
  private async executeRoute(ctx: any, route: Route<any>): Promise<void> {
    await this._middlewareManager.apply(ctx, route.run.bind(route))
  }

  /**
   * Handle an incoming interaction and execute the associated route.
   * @param interaction - The interaction to be handled.
   * @returns A promise that resolves when the handling is complete.
   */

  public async handle(message: Message): Promise<void>
  public async handle(Interaction: Interaction): Promise<void>
  public async handle(data: Interaction | Message): Promise<void> {
    if (data instanceof Message) {
      if (data.author.bot || data.author.id === data.client.user?.id) {
        return
      }
      console.log('parsing message')
      const ctx = contextConstructor(data, this._plugins)
      const routes = this.messageRoutes
      const route = routes.find((route) => route.name.test(data.content))
      if (route === undefined) {
        return
      }
      await this.executeRoute(ctx, route)
    } else {
      const ctx = contextConstructor(data, this._plugins)
      const path = this.getRoutePath(data)
      const route = this.getRoute(path)
      if (route === undefined) {
        return
      }
      await this.executeRoute(ctx, route)
    }
  }
}
