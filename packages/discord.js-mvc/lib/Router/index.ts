import { MiddlewareManager } from '../Middleware'
import { type Route } from './Route'
import { type Middleware } from '../Middleware/types'
import { type Interaction, Message} from 'discord.js'
import { match } from 'path-to-regexp'
import {  MaybeArray, hasCustomId } from '../types'
import { contextConstructor } from '../base/Context'

/**
 * Router class responsible for handling and routing interactions.
 */
export class Router{
  readonly _routes: Route[] = [];
  readonly _middlewareManager: MiddlewareManager = new MiddlewareManager();

  /**
   * Add middlewares to be applied to all routes in the router.
   * @param middlewares - The middlewares to be added.
   * @returns The router instance.
   */
  public use(...middlewares: Middleware[]): this {
    this._middlewareManager.add(...middlewares);
    return this;
  }

  /**
   * Add routes to the router.
   * @param routes - The routes to be added.
   * @returns The router instance.
   */
  public add(...routes: Array<MaybeArray<Route<any>>>): this {
    this._routes.push(...routes.flat());
    return this;
  }

  public getRoute(path: string): Route | undefined {
    for (const route of this._routes) {
      const matchFN = match(route.name);
      if (matchFN(path) !== false) {
        return route;
      }
    }
  }

  public getRoutePath(interaction: Interaction): string {
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


  public async handle(message: Message): Promise<void>;
  public async handle(Interaction: Interaction): Promise<void>;
  public async handle(data: Interaction|Message): Promise<void> {
    if (data instanceof Message) {
      throw new Error('Not implemented');
    }
    else {
      const ctx = contextConstructor(data, []);
      const path = this.getRoutePath(data);
      const route = this.getRoute(path);
      if (route === undefined) {
        return;
      }
      await this._middlewareManager.apply(ctx, route.run.bind(route));
    }
  }
}