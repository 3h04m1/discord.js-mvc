import {
  type Controller 
} from '../Controllers'
import { type Interaction, type BaseInteraction } from 'discord.js'
import { type Middleware } from './types'
import RouteManager from '../Router/Route/RouteManager'
export { type Middleware } from './types'


/**
 * Manages the execution of middlewares for processing interactions.
 * @template T - The type of interaction to be processed. Defaults to `Interaction`.
 */
export class MiddlewareManager<T extends BaseInteraction = Interaction> {
  private readonly middlewares: Array<Middleware<T>> = [];

  /**
   * Adds middlewares to the manager.
   * @param middlewares - The middlewares to be added.
   */
  public add(...middlewares: Array<Middleware<T>>): void {
    this.middlewares.push(...middlewares);
  }

  /**
   * Applies the registered middlewares to process the interaction.
   * @param interaction - The interaction to be processed.
   * @param controller - The controller function to be invoked after middleware processing.
   * @param routeName - Optional route name to extract params for route-specific middleware processing.
   * @returns A promise that resolves when the middleware processing is complete.
   */
  public async apply(
    interaction: T,
    controller: Controller<T>,
    routeName?: string
  ): Promise<void> {
    let params: Record<string, any> = {};
    if (routeName != null) {
      params = RouteManager.extractParams(interaction, routeName);
    }
    const middlewareStack = [...this.middlewares];
    const runner = async (): Promise<void> => {
      const middleware = middlewareStack.shift();
      if (middleware != null) {
        await middleware(interaction, runner, params);
      } else {
        await controller(interaction, params);
      }
    };
    await runner();
  }

  /**
   * Checks if the middleware manager is empty.
   * @returns `true` if the middleware manager is empty, `false` otherwise.
   */
  public get isEmpty(): boolean {
    return this.middlewares.length === 0;
  }
}
