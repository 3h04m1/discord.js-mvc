import { MiddlewareManager } from '../Middleware'
import { type Route } from './Route'
import { type Middleware } from '../Middleware/types'
import { type Interaction, type BaseInteraction} from 'discord.js'
import {match} from 'path-to-regexp'
import {  hasCustomId } from '../types'

/**
 * Router class responsible for handling and routing interactions.
 */
export class Router {
  private readonly _routes: Route[] = [];
  private readonly _middlewareManager: MiddlewareManager = new MiddlewareManager();

  /**
   * Add middlewares to be applied to all routes in the router.
   * @param middlewares - The middlewares to be added.
   * @returns The router instance.
   */
  public use(...middlewares: Middleware[]): Router {
    this._middlewareManager.add(...middlewares);
    return this;
  }

  /**
   * Add routes to the router.
   * @param routes - The routes to be added.
   * @returns The router instance.
   */
  public add(...routes: Array<Route<any>| Array<Route<any>>>): Router {
    this._routes.push(...routes.flat());
    return this;
  }

  private getRoute(path: string): Route | undefined {
    for (const route of this._routes) {
      const matchFN = match(route.name);
      if (matchFN(path) !== false) {
        return route;
      }
    }
  }

  private getRoutePath<T extends BaseInteraction>(interaction: T): string {
    if (hasCustomId(interaction)) {
      return interaction.customId;
    } else if (interaction.isCommand()) {
      return interaction.commandName;
    }
    throw new Error('Invalid interaction');
  }

  /**
   * Handle an incoming interaction and execute the associated route.
   * @param interaction - The interaction to be handled.
   * @returns A promise that resolves when the handling is complete.
   */
  public async handle(interaction: Interaction): Promise<void> {
    const path = this.getRoutePath(interaction);
    const route = this.getRoute(path);
    if (route === undefined) {
      return;
    }
    await this._middlewareManager.apply(interaction, route.run.bind(route), route.name);
  }
}